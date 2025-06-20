-- Tablas adicionales para pagos y automatizaciones avanzadas

-- Tabla de métodos de pago
CREATE TABLE payment_methods (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'credit_card', 'bank_transfer', 'digital_wallet', 'cash'
    provider VARCHAR(100), -- 'paypal', 'stripe', 'banco', etc.
    fee_percentage DECIMAL(5,2) DEFAULT 0.00,
    fee_fixed DECIMAL(10,2) DEFAULT 0.00,
    processing_time VARCHAR(50),
    supported_currencies JSON,
    config JSON,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de transacciones de pago
CREATE TABLE payment_transactions (
    id SERIAL PRIMARY KEY,
    payment_id VARCHAR(100) UNIQUE NOT NULL,
    invoice_id INTEGER REFERENCES invoices(id),
    customer_id INTEGER REFERENCES customers(id),
    payment_method_id INTEGER REFERENCES payment_methods(id),
    external_transaction_id VARCHAR(255),
    amount DECIMAL(10,2) NOT NULL,
    fee_amount DECIMAL(10,2) DEFAULT 0.00,
    net_amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'NIO',
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'completed', 'failed', 'refunded'
    gateway_response JSON,
    processed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de automatizaciones
CREATE TABLE automations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    trigger_event VARCHAR(100) NOT NULL,
    conditions TEXT, -- Condiciones en formato JSON o expresión
    actions JSON NOT NULL, -- Array de acciones a ejecutar
    delay_minutes INTEGER DEFAULT 0,
    template_id INTEGER,
    is_active BOOLEAN DEFAULT TRUE,
    execution_count INTEGER DEFAULT 0,
    success_count INTEGER DEFAULT 0,
    last_executed_at TIMESTAMP,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de ejecuciones de automatización
CREATE TABLE automation_executions (
    id SERIAL PRIMARY KEY,
    automation_id INTEGER REFERENCES automations(id),
    trigger_data JSON,
    execution_status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'running', 'completed', 'failed'
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    error_message TEXT,
    execution_time_ms INTEGER,
    actions_executed JSON
);

-- Tabla de plantillas de automatización
CREATE TABLE automation_templates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    trigger_event VARCHAR(100) NOT NULL,
    default_actions JSON NOT NULL,
    default_conditions TEXT,
    variables JSON, -- Variables disponibles para la plantilla
    category VARCHAR(100),
    is_system BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de configuración DGI
CREATE TABLE dgi_configuration (
    id SERIAL PRIMARY KEY,
    company_ruc VARCHAR(20) NOT NULL,
    certificate_path VARCHAR(500),
    certificate_password VARCHAR(255),
    environment VARCHAR(20) DEFAULT 'test', -- 'test', 'production'
    api_endpoint VARCHAR(500),
    last_sequence_number INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de facturas DGI
CREATE TABLE dgi_invoices (
    id SERIAL PRIMARY KEY,
    invoice_id INTEGER REFERENCES invoices(id),
    dgi_control_number VARCHAR(50) UNIQUE NOT NULL,
    authorization_code VARCHAR(100),
    xml_content TEXT,
    qr_code_url VARCHAR(500),
    dgi_status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'authorized', 'rejected', 'cancelled'
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    authorization_date TIMESTAMP,
    rejection_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de conciliación bancaria
CREATE TABLE bank_reconciliation (
    id SERIAL PRIMARY KEY,
    bank_statement_date DATE NOT NULL,
    bank_balance DECIMAL(12,2) NOT NULL,
    system_balance DECIMAL(12,2) NOT NULL,
    difference DECIMAL(12,2) NOT NULL,
    reconciled_transactions INTEGER DEFAULT 0,
    pending_transactions INTEGER DEFAULT 0,
    discrepancies INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'completed', 'reviewed'
    reconciled_by INTEGER REFERENCES users(id),
    reconciled_at TIMESTAMP,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de elementos de conciliación
CREATE TABLE reconciliation_items (
    id SERIAL PRIMARY KEY,
    reconciliation_id INTEGER REFERENCES bank_reconciliation(id),
    transaction_id INTEGER REFERENCES payment_transactions(id),
    bank_reference VARCHAR(255),
    amount DECIMAL(10,2) NOT NULL,
    transaction_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'pending', -- 'matched', 'pending', 'discrepancy'
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar métodos de pago por defecto
INSERT INTO payment_methods (name, type, provider, fee_percentage, fee_fixed, processing_time, supported_currencies, config) VALUES
('PayPal', 'digital_wallet', 'paypal', 3.00, 0.00, 'Inmediato', '["USD", "NIO"]', '{"environment": "sandbox", "client_id": "", "client_secret": ""}'),
('Stripe', 'credit_card', 'stripe', 2.90, 10.00, '1-2 días', '["USD", "NIO"]', '{"environment": "test", "publishable_key": "", "secret_key": ""}'),
('Transferencia Bancaria', 'bank_transfer', 'banco', 0.00, 0.00, '1-3 días', '["NIO"]', '{"account_number": "", "bank_name": ""}'),
('Efectivo', 'cash', 'manual', 0.00, 0.00, 'Inmediato', '["NIO"]', '{}');

-- Insertar plantillas de automatización
INSERT INTO automation_templates (name, description, trigger_event, default_actions, variables, category) VALUES
('Bienvenida Cliente', 'Email de bienvenida para nuevos clientes', 'customer_registered', 
'[{"type": "send_email", "template": "welcome_email", "delay": 5}]',
'{"customer_name": "string", "customer_email": "string", "registration_date": "date"}', 'customer'),

('Notificación Envío Creado', 'WhatsApp cuando se crea un nuevo envío', 'shipment_created',
'[{"type": "send_whatsapp", "template": "shipment_created", "delay": 0}]',
'{"customer_name": "string", "tracking_code": "string", "destination": "string", "estimated_delivery": "date"}', 'shipment'),

('Recordatorio Pago', 'Recordatorio antes del vencimiento de factura', 'invoice_due_reminder',
'[{"type": "send_email", "template": "payment_reminder", "delay": 0}, {"type": "send_sms", "template": "payment_reminder_sms", "delay": 60}]',
'{"customer_name": "string", "invoice_number": "string", "amount": "number", "due_date": "date"}', 'billing'),

('Envío Entregado', 'Notificación y solicitud de calificación', 'shipment_delivered',
'[{"type": "send_whatsapp", "template": "delivery_confirmation", "delay": 0}, {"type": "send_email", "template": "rating_request", "delay": 1440}]',
'{"customer_name": "string", "tracking_code": "string", "delivery_date": "date"}', 'shipment'),

('Ticket Urgente', 'Notificación inmediata para tickets de alta prioridad', 'support_ticket_high_priority',
'[{"type": "send_email", "template": "urgent_ticket_notification", "delay": 0, "recipients": ["admin", "supervisor"]}]',
'{"ticket_id": "string", "customer_name": "string", "subject": "string", "priority": "string"}', 'support');

-- Insertar configuración DGI por defecto
INSERT INTO dgi_configuration (company_ruc, environment, api_endpoint) VALUES
('J0310000000001', 'test', 'https://api-test.dgi.gob.ni/fe/v1.0');

-- Índices para mejorar rendimiento
CREATE INDEX idx_payment_transactions_status ON payment_transactions(status);
CREATE INDEX idx_payment_transactions_invoice_id ON payment_transactions(invoice_id);
CREATE INDEX idx_payment_transactions_customer_id ON payment_transactions(customer_id);
CREATE INDEX idx_payment_transactions_created_at ON payment_transactions(created_at);

CREATE INDEX idx_automations_trigger_event ON automations(trigger_event, is_active);
CREATE INDEX idx_automation_executions_automation_id ON automation_executions(automation_id);
CREATE INDEX idx_automation_executions_status ON automation_executions(execution_status);

CREATE INDEX idx_dgi_invoices_control_number ON dgi_invoices(dgi_control_number);
CREATE INDEX idx_dgi_invoices_status ON dgi_invoices(dgi_status);
CREATE INDEX idx_dgi_invoices_invoice_id ON dgi_invoices(invoice_id);

CREATE INDEX idx_bank_reconciliation_date ON bank_reconciliation(bank_statement_date);
CREATE INDEX idx_reconciliation_items_status ON reconciliation_items(status);
