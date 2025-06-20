-- Tablas para funcionalidades avanzadas del CRM

-- Tabla de inventario
CREATE TABLE inventory_items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    sku VARCHAR(100) UNIQUE,
    current_stock INTEGER DEFAULT 0,
    min_stock INTEGER DEFAULT 0,
    max_stock INTEGER DEFAULT 0,
    unit_cost DECIMAL(10,2) DEFAULT 0.00,
    supplier_id INTEGER,
    location VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de movimientos de inventario
CREATE TABLE inventory_movements (
    id SERIAL PRIMARY KEY,
    item_id INTEGER REFERENCES inventory_items(id),
    movement_type VARCHAR(20) NOT NULL, -- 'in', 'out', 'adjustment'
    quantity INTEGER NOT NULL,
    reason VARCHAR(255),
    reference_id INTEGER, -- ID del envío, compra, etc.
    reference_type VARCHAR(50), -- 'shipment', 'purchase', 'adjustment'
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de proveedores
CREATE TABLE suppliers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    payment_terms VARCHAR(100),
    notes TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de leads/prospectos
CREATE TABLE leads (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    company VARCHAR(255),
    position VARCHAR(100),
    source VARCHAR(50), -- 'website', 'referral', 'social_media', 'advertising'
    status VARCHAR(20) DEFAULT 'new', -- 'new', 'contacted', 'qualified', 'proposal', 'won', 'lost'
    score INTEGER DEFAULT 0,
    estimated_value DECIMAL(10,2),
    urgency VARCHAR(20) DEFAULT 'medium', -- 'low', 'medium', 'high'
    notes TEXT,
    assigned_to INTEGER REFERENCES users(id),
    last_contact_date TIMESTAMP,
    next_follow_up TIMESTAMP,
    converted_to_customer_id INTEGER REFERENCES customers(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de actividades de leads
CREATE TABLE lead_activities (
    id SERIAL PRIMARY KEY,
    lead_id INTEGER REFERENCES leads(id),
    activity_type VARCHAR(50) NOT NULL, -- 'call', 'email', 'meeting', 'note'
    subject VARCHAR(255),
    description TEXT,
    outcome VARCHAR(100),
    next_action VARCHAR(255),
    user_id INTEGER REFERENCES users(id),
    scheduled_at TIMESTAMP,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de campañas de marketing
CREATE TABLE marketing_campaigns (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(50) NOT NULL, -- 'email', 'sms', 'whatsapp', 'mixed'
    status VARCHAR(20) DEFAULT 'draft', -- 'draft', 'active', 'paused', 'completed', 'cancelled'
    target_audience JSON, -- Criterios de segmentación
    content JSON, -- Contenido de la campaña
    budget DECIMAL(10,2),
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de métricas de campañas
CREATE TABLE campaign_metrics (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER REFERENCES marketing_campaigns(id),
    metric_date DATE NOT NULL,
    audience_size INTEGER DEFAULT 0,
    messages_sent INTEGER DEFAULT 0,
    messages_delivered INTEGER DEFAULT 0,
    messages_opened INTEGER DEFAULT 0,
    links_clicked INTEGER DEFAULT 0,
    conversions INTEGER DEFAULT 0,
    revenue_generated DECIMAL(10,2) DEFAULT 0.00,
    cost DECIMAL(10,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de segmentos de clientes
CREATE TABLE customer_segments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    criteria JSON NOT NULL, -- Criterios de segmentación en formato JSON
    is_dynamic BOOLEAN DEFAULT TRUE, -- Si se actualiza automáticamente
    customer_count INTEGER DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de relación segmentos-clientes
CREATE TABLE customer_segment_members (
    id SERIAL PRIMARY KEY,
    segment_id INTEGER REFERENCES customer_segments(id),
    customer_id INTEGER REFERENCES customers(id),
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(segment_id, customer_id)
);

-- Tabla de métricas de negocio
CREATE TABLE business_metrics (
    id SERIAL PRIMARY KEY,
    metric_name VARCHAR(100) NOT NULL,
    metric_value DECIMAL(15,4) NOT NULL,
    metric_date DATE NOT NULL,
    metric_type VARCHAR(50), -- 'revenue', 'customers', 'shipments', 'satisfaction', etc.
    category VARCHAR(50),
    metadata JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(metric_name, metric_date)
);

-- Tabla de alertas del sistema
CREATE TABLE system_alerts (
    id SERIAL PRIMARY KEY,
    alert_type VARCHAR(50) NOT NULL, -- 'low_stock', 'overdue_payment', 'system_error', etc.
    severity VARCHAR(20) DEFAULT 'medium', -- 'low', 'medium', 'high', 'critical'
    title VARCHAR(255) NOT NULL,
    message TEXT,
    entity_type VARCHAR(50), -- 'inventory', 'customer', 'shipment', etc.
    entity_id INTEGER,
    is_read BOOLEAN DEFAULT FALSE,
    is_resolved BOOLEAN DEFAULT FALSE,
    assigned_to INTEGER REFERENCES users(id),
    resolved_by INTEGER REFERENCES users(id),
    resolved_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de tareas y recordatorios
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    task_type VARCHAR(50), -- 'follow_up', 'call', 'email', 'meeting', 'general'
    priority VARCHAR(20) DEFAULT 'medium', -- 'low', 'medium', 'high', 'urgent'
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'in_progress', 'completed', 'cancelled'
    assigned_to INTEGER REFERENCES users(id),
    created_by INTEGER REFERENCES users(id),
    related_entity_type VARCHAR(50), -- 'customer', 'lead', 'shipment', etc.
    related_entity_id INTEGER,
    due_date TIMESTAMP,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos de ejemplo para inventario
INSERT INTO inventory_items (name, description, category, sku, current_stock, min_stock, max_stock, unit_cost, location) VALUES
('Cajas Pequeñas (20x15x10cm)', 'Cajas de cartón para envíos pequeños', 'Embalaje', 'BOX-S-001', 150, 50, 500, 15.00, 'Almacén A-1'),
('Cajas Medianas (30x25x20cm)', 'Cajas de cartón para envíos medianos', 'Embalaje', 'BOX-M-001', 25, 30, 300, 25.00, 'Almacén A-2'),
('Cajas Grandes (40x35x30cm)', 'Cajas de cartón para envíos grandes', 'Embalaje', 'BOX-L-001', 80, 20, 200, 35.00, 'Almacén A-3'),
('Cinta de Embalaje', 'Cinta adhesiva transparente 48mm x 100m', 'Suministros', 'TAPE-001', 200, 100, 1000, 8.50, 'Almacén B-1'),
('Etiquetas de Envío', 'Etiquetas adhesivas 10x15cm', 'Suministros', 'LABEL-001', 5000, 1000, 10000, 0.25, 'Oficina Principal'),
('Papel Burbuja', 'Rollo de papel burbuja 1m x 50m', 'Protección', 'BUBBLE-001', 45, 20, 100, 45.00, 'Almacén B-2'),
('Marcadores Permanentes', 'Marcadores negros para etiquetado', 'Suministros', 'MARKER-001', 25, 10, 50, 12.00, 'Oficina Principal');

-- Insertar proveedores de ejemplo
INSERT INTO suppliers (name, contact_person, email, phone, address, payment_terms) VALUES
('Empaques Nicaragua S.A.', 'Roberto Martínez', 'ventas@empaquesnica.com', '+505 2222-1111', 'Zona Industrial, Managua', '30 días'),
('Suministros Industriales', 'Ana García', 'info@suministrosind.com', '+505 2333-2222', 'Carretera Norte, Managua', '15 días'),
('Impresiones Rápidas', 'Carlos López', 'pedidos@impresionesrapidas.com', '+505 2444-3333', 'Centro Comercial, Managua', 'Contado'),
('Materiales de Oficina', 'María Rodríguez', 'ventas@materialesoficina.com', '+505 2555-4444', 'Plaza España, Managua', '30 días');

-- Insertar segmentos de clientes
INSERT INTO customer_segments (name, description, criteria, customer_count) VALUES
('Clientes VIP', 'Clientes con más de 10 envíos y alto valor', '{"shipments_count": {"$gte": 10}, "total_spent": {"$  'Clientes con más de 10 envíos y alto valor', '{"shipments_count": {"$gte": 10}, "total_spent": {"$gte": 5000}}', 156),
('Nuevos Clientes', 'Clientes registrados en los últimos 30 días', '{"registration_date": {"$gte": "30_days_ago"}}', 89),
('Clientes Inactivos', 'Sin envíos en los últimos 90 días', '{"last_shipment_date": {"$lte": "90_days_ago"}}', 234),
('Clientes Frecuentes', 'Entre 5 y 10 envíos en el último año', '{"shipments_count": {"$gte": 5, "$lt": 10}}', 178),
('Clientes Internacionales', 'Envíos fuera de Centroamérica', '{"destinations": {"$in": ["Mexico", "Estados Unidos"]}}', 67);

-- Insertar leads de ejemplo
INSERT INTO leads (name, email, phone, company, source, status, score, estimated_value, urgency, notes) VALUES
('Empresa Importadora XYZ', 'contacto@importadoraxyz.com', '+505 8888-9999', 'Importadora XYZ', 'website', 'new', 85, 15000, 'high', 'Interesado en servicio de importación desde China'),
('María Fernández', 'maria.fernandez@tienda.com', '+505 7777-8888', 'Tienda Online', 'referral', 'qualified', 92, 8500, 'medium', 'Necesita envíos regulares a Costa Rica'),
('Distribuidora Central', 'gerencia@distcentral.com', '+505 6666-7777', 'Distribuidora Central', 'advertising', 'contacted', 78, 12000, 'high', 'Requiere logística para productos farmacéuticos'),
('Roberto Sánchez', 'roberto@comercial.com', '+505 5555-6666', 'Comercial RS', 'social_media', 'proposal', 88, 6500, 'medium', 'Interesado en servicio express a Guatemala');

-- Insertar métricas de negocio
INSERT INTO business_metrics (metric_name, metric_value, metric_date, metric_type, category) VALUES
('total_revenue', 145230.00, CURRENT_DATE, 'revenue', 'financial'),
('total_shipments', 312, CURRENT_DATE, 'shipments', 'operations'),
('active_customers', 380, CURRENT_DATE, 'customers', 'sales'),
('average_delivery_time', 3.2, CURRENT_DATE, 'performance', 'operations'),
('customer_satisfaction', 4.8, CURRENT_DATE, 'satisfaction', 'quality'),
('conversion_rate', 23.5, CURRENT_DATE, 'conversion', 'sales'),
('inventory_value', 89450.00, CURRENT_DATE, 'inventory', 'operations'),
('support_response_time', 2.1, CURRENT_DATE, 'support', 'quality');

-- Insertar alertas del sistema
INSERT INTO system_alerts (alert_type, severity, title, message, entity_type, entity_id) VALUES
('low_stock', 'high', 'Stock Bajo - Cajas Medianas', 'Las cajas medianas están por debajo del stock mínimo (25/30)', 'inventory', 2),
('overdue_payment', 'medium', 'Factura Vencida', 'La factura FAC-001236 está vencida desde hace 5 días', 'invoice', 3),
('system_maintenance', 'low', 'Mantenimiento Programado', 'Mantenimiento del sistema programado para el domingo 2:00 AM', 'system', NULL),
('high_priority_ticket', 'high', 'Ticket Urgente', 'Nuevo ticket de alta prioridad requiere atención inmediata', 'ticket', 4);

-- Insertar tareas de ejemplo
INSERT INTO tasks (title, description, task_type, priority, assigned_to, related_entity_type, related_entity_id, due_date) VALUES
('Llamar a Importadora XYZ', 'Seguimiento del lead para cotización de servicios', 'follow_up', 'high', 2, 'lead', 1, CURRENT_TIMESTAMP + INTERVAL '1 day'),
('Reabastecer inventario', 'Ordenar más cajas medianas al proveedor', 'general', 'medium', 1, 'inventory', 2, CURRENT_TIMESTAMP + INTERVAL '2 days'),
('Revisar factura vencida', 'Contactar cliente para pago de factura FAC-001236', 'call', 'high', 2, 'invoice', 3, CURRENT_TIMESTAMP + INTERVAL '1 day'),
('Preparar reporte mensual', 'Generar reporte de rendimiento para gerencia', 'general', 'medium', 1, NULL, NULL, CURRENT_TIMESTAMP + INTERVAL '3 days');

-- Índices para mejorar rendimiento
CREATE INDEX idx_inventory_items_category ON inventory_items(category);
CREATE INDEX idx_inventory_items_stock ON inventory_items(current_stock, min_stock);
CREATE INDEX idx_inventory_movements_item_id ON inventory_movements(item_id);
CREATE INDEX idx_inventory_movements_created_at ON inventory_movements(created_at);

CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_score ON leads(score);
CREATE INDEX idx_leads_assigned_to ON leads(assigned_to);
CREATE INDEX idx_leads_source ON leads(source);

CREATE INDEX idx_marketing_campaigns_status ON marketing_campaigns(status);
CREATE INDEX idx_marketing_campaigns_type ON marketing_campaigns(type);
CREATE INDEX idx_campaign_metrics_campaign_id ON campaign_metrics(campaign_id);

CREATE INDEX idx_customer_segments_name ON customer_segments(name);
CREATE INDEX idx_customer_segment_members_segment_id ON customer_segment_members(segment_id);
CREATE INDEX idx_customer_segment_members_customer_id ON customer_segment_members(customer_id);

CREATE INDEX idx_business_metrics_name_date ON business_metrics(metric_name, metric_date);
CREATE INDEX idx_business_metrics_type ON business_metrics(metric_type);

CREATE INDEX idx_system_alerts_type ON system_alerts(alert_type);
CREATE INDEX idx_system_alerts_severity ON system_alerts(severity);
CREATE INDEX idx_system_alerts_is_read ON system_alerts(is_read);
CREATE INDEX idx_system_alerts_assigned_to ON system_alerts(assigned_to);

CREATE INDEX idx_tasks_assigned_to ON tasks(assigned_to);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
CREATE INDEX idx_tasks_priority ON tasks(priority);
