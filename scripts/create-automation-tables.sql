-- Tablas adicionales para automatización y workflows

-- Tabla de workflows de n8n
CREATE TABLE workflows (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    trigger_event VARCHAR(100) NOT NULL,
    webhook_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    config JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de eventos del sistema para automatización
CREATE TABLE system_events (
    id SERIAL PRIMARY KEY,
    event_type VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL, -- 'shipment', 'customer', 'invoice', etc.
    entity_id INTEGER NOT NULL,
    event_data JSON,
    processed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de plantillas de notificaciones
CREATE TABLE notification_templates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'email', 'sms', 'whatsapp'
    event_trigger VARCHAR(100) NOT NULL,
    subject VARCHAR(255),
    template_content TEXT NOT NULL,
    variables JSON, -- Variables disponibles en la plantilla
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de configuración de precios por ruta
CREATE TABLE pricing_rules (
    id SERIAL PRIMARY KEY,
    origin_country VARCHAR(100) DEFAULT 'Nicaragua',
    destination_country VARCHAR(100) NOT NULL,
    base_price DECIMAL(10,2) NOT NULL,
    price_per_kg DECIMAL(10,2) NOT NULL,
    multiplier DECIMAL(5,2) DEFAULT 1.00,
    service_type VARCHAR(50) DEFAULT 'standard',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de auditoría para cumplimiento legal
CREATE TABLE audit_log (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id INTEGER,
    old_values JSON,
    new_values JSON,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de configuración del sistema
CREATE TABLE system_settings (
    id SERIAL PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type VARCHAR(20) DEFAULT 'string', -- 'string', 'number', 'boolean', 'json'
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE, -- Si la configuración es visible públicamente
    updated_by INTEGER REFERENCES users(id),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar configuraciones por defecto
INSERT INTO system_settings (setting_key, setting_value, setting_type, description, is_public) VALUES
('company_name', 'Envíos Nicaragua S.A.', 'string', 'Nombre de la empresa', TRUE),
('company_ruc', 'J0310000000001', 'string', 'RUC de la empresa', TRUE),
('company_address', 'Managua, Nicaragua', 'string', 'Dirección de la empresa', TRUE),
('company_phone', '+505 2222-3333', 'string', 'Teléfono de la empresa', TRUE),
('company_email', 'info@enviosnica.com', 'string', 'Email de la empresa', TRUE),
('default_tax_rate', '15.00', 'number', 'Tasa de IVA por defecto', FALSE),
('session_timeout', '30', 'number', 'Tiempo de expiración de sesión en minutos', FALSE),
('backup_frequency', 'daily', 'string', 'Frecuencia de respaldos automáticos', FALSE),
('notification_email_enabled', 'true', 'boolean', 'Habilitar notificaciones por email', FALSE),
('notification_sms_enabled', 'true', 'boolean', 'Habilitar notificaciones por SMS', FALSE),
('notification_whatsapp_enabled', 'false', 'boolean', 'Habilitar notificaciones por WhatsApp', FALSE);

-- Insertar reglas de precios por defecto
INSERT INTO pricing_rules (destination_country, base_price, price_per_kg, multiplier, service_type) VALUES
('Costa Rica', 150.00, 80.00, 1.20, 'standard'),
('Guatemala', 150.00, 80.00, 1.30, 'standard'),
('Honduras', 150.00, 80.00, 1.20, 'standard'),
('El Salvador', 150.00, 80.00, 1.20, 'standard'),
('Panamá', 150.00, 80.00, 1.40, 'standard'),
('México', 150.00, 80.00, 1.80, 'standard'),
('Estados Unidos', 150.00, 80.00, 2.50, 'standard'),
('Costa Rica', 200.00, 100.00, 1.50, 'express'),
('Guatemala', 200.00, 100.00, 1.60, 'express'),
('Honduras', 200.00, 100.00, 1.50, 'express');

-- Insertar plantillas de notificación por defecto
INSERT INTO notification_templates (name, type, event_trigger, subject, template_content, variables) VALUES
('Envío Creado - Email', 'email', 'shipment_created', 'Tu envío ha sido registrado', 
'Hola {{customer_name}},

Tu envío {{tracking_code}} ha sido registrado exitosamente.

Detalles:
- Origen: {{origin}}
- Destino: {{destination}}
- Peso: {{weight}}
- Entrega estimada: {{estimated_delivery}}

Puedes rastrear tu envío en: {{tracking_url}}

Saludos,
Equipo de Envíos Nicaragua', 
'{"customer_name": "string", "tracking_code": "string", "origin": "string", "destination": "string", "weight": "string", "estimated_delivery": "string", "tracking_url": "string"}'),

('Envío en Tránsito - SMS', 'sms', 'shipment_in_transit', NULL,
'Tu paquete {{tracking_code}} está en tránsito hacia {{destination}}. Entrega estimada: {{estimated_delivery}}. Rastrea en: {{tracking_url}}',
'{"tracking_code": "string", "destination": "string", "estimated_delivery": "string", "tracking_url": "string"}'),

('Envío Entregado - WhatsApp', 'whatsapp', 'shipment_delivered', NULL,
'¡Tu paquete {{tracking_code}} ha sido entregado exitosamente! Gracias por confiar en Envíos Nicaragua. ¿Cómo calificarías nuestro servicio? Responde del 1 al 5.',
'{"tracking_code": "string"}'),

('Factura Generada - Email', 'email', 'invoice_generated', 'Nueva factura generada',
'Estimado/a {{customer_name}},

Se ha generado la factura {{invoice_number}} por un monto de {{total_amount}}.

Detalles:
- Número DGI: {{dgi_number}}
- Fecha de vencimiento: {{due_date}}
- Envío relacionado: {{shipment_id}}

Puedes descargar tu factura desde nuestro portal.

Saludos,
Departamento de Facturación',
'{"customer_name": "string", "invoice_number": "string", "total_amount": "string", "dgi_number": "string", "due_date": "string", "shipment_id": "string"}');

-- Insertar workflows de ejemplo para n8n
INSERT INTO workflows (name, description, trigger_event, webhook_url, config) VALUES
('Notificación WhatsApp Nuevo Envío', 'Envía mensaje de WhatsApp cuando se crea un nuevo envío', 'shipment_created', 'https://n8n.enviosnica.com/webhook/whatsapp-new-shipment', '{"template": "shipment_created_whatsapp", "delay_minutes": 0}'),
('Email Bienvenida Cliente', 'Envía email de bienvenida a nuevos clientes', 'customer_registered', 'https://n8n.enviosnica.com/webhook/welcome-email', '{"template": "customer_welcome", "delay_minutes": 5}'),
('Recordatorio Pago Factura', 'Envía recordatorio de pago 3 días antes del vencimiento', 'invoice_due_reminder', 'https://n8n.enviosnica.com/webhook/payment-reminder', '{"template": "payment_reminder", "delay_days": -3}'),
('Notificación Ticket Urgente', 'Notifica al supervisor cuando se crea un ticket de alta prioridad', 'support_ticket_high_priority', 'https://n8n.enviosnica.com/webhook/urgent-ticket', '{"notify_roles": ["admin", "supervisor"]}');

-- Índices para mejorar rendimiento
CREATE INDEX idx_system_events_type_processed ON system_events(event_type, processed);
CREATE INDEX idx_system_events_created_at ON system_events(created_at);
CREATE INDEX idx_audit_log_user_id ON audit_log(user_id);
CREATE INDEX idx_audit_log_created_at ON audit_log(created_at);
CREATE INDEX idx_pricing_rules_destination ON pricing_rules(destination_country, service_type);
CREATE INDEX idx_notification_templates_trigger ON notification_templates(event_trigger, is_active);
