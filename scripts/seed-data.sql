-- Datos de prueba para el CRM de envíos

-- Insertar usuarios del sistema
INSERT INTO users (name, email, password_hash, role) VALUES
('Administrador', 'admin@enviosnica.com', '$2b$10$hash', 'admin'),
('María Operadora', 'maria@enviosnica.com', '$2b$10$hash', 'employee'),
('Carlos Supervisor', 'carlos@enviosnica.com', '$2b$10$hash', 'supervisor');

-- Insertar clientes de prueba
INSERT INTO customers (name, email, phone, ruc, address, city, country, accepts_marketing, data_consent, status) VALUES
('María González Pérez', 'maria.gonzalez@email.com', '+505 8765-4321', 'J0310000000001', 'Residencial Las Colinas, Casa 123', 'Managua', 'Nicaragua', TRUE, TRUE, 'active'),
('Carlos Pérez Martínez', 'carlos.perez@empresa.com', '+505 8765-4322', 'J0310000000002', 'Barrio San Juan, 2c al lago', 'León', 'Nicaragua', FALSE, TRUE, 'active'),
('Ana Rodríguez López', 'ana.rodriguez@email.com', '+505 8765-4323', 'J0310000000003', 'Centro Histórico, Calle La Calzada', 'Granada', 'Nicaragua', TRUE, TRUE, 'active'),
('Luis Martínez Silva', 'luis.martinez@email.com', '+505 8765-4324', 'J0310000000004', 'Reparto Schick, Módulo 15', 'Managua', 'Nicaragua', TRUE, TRUE, 'active'),
('Carmen Flores Vega', 'carmen.flores@email.com', '+505 8765-4325', 'J0310000000005', 'Barrio Martha Quezada, Casa 45', 'Managua', 'Nicaragua', FALSE, TRUE, 'active');

-- Insertar envíos de prueba
INSERT INTO shipments (tracking_code, customer_id, origin_address, origin_city, destination_address, destination_city, destination_country, weight, package_type, description, amount, status, estimated_delivery) VALUES
('TRK-001234567', 1, 'Residencial Las Colinas, Casa 123, Managua', 'Managua', 'Avenida Central 456, San José', 'San José', 'Costa Rica', 2.5, 'Paquete pequeño', 'Documentos y regalos familiares', 450.00, 'in_transit', '2024-01-18'),
('TRK-001234568', 2, 'Barrio San Juan, 2c al lago, León', 'León', 'Zona 10, Guatemala City', 'Guatemala City', 'Guatemala', 1.8, 'Documentos', 'Contratos comerciales', 320.00, 'delivered', '2024-01-13'),
('TRK-001234569', 3, 'Centro Histórico, Calle La Calzada, Granada', 'Granada', 'Colonia Palmira, Tegucigalpa', 'Tegucigalpa', 'Honduras', 3.2, 'Paquete mediano', 'Productos artesanales', 280.00, 'preparation', '2024-01-19'),
('TRK-001234570', 4, 'Reparto Schick, Módulo 15, Managua', 'Managua', 'San Salvador Centro', 'San Salvador', 'El Salvador', 1.5, 'Documentos', 'Documentos legales', 380.00, 'in_transit', '2024-01-20'),
('TRK-001234571', 5, 'Barrio Martha Quezada, Casa 45, Managua', 'Managua', 'Ciudad de Panamá', 'Ciudad de Panamá', 'Panamá', 4.0, 'Paquete grande', 'Equipos electrónicos', 650.00, 'preparation', '2024-01-22');

-- Insertar seguimiento de envíos
INSERT INTO shipment_tracking (shipment_id, status, location, notes) VALUES
(1, 'Paquete recibido', 'Managua, Nicaragua', 'Paquete recibido en oficina principal'),
(1, 'En preparación', 'Centro de distribución Managua', 'Preparando para envío internacional'),
(1, 'En tránsito', 'Frontera Peñas Blancas', 'Cruzando frontera hacia Costa Rica'),
(2, 'Paquete recibido', 'León, Nicaragua', 'Paquete recibido en sucursal León'),
(2, 'En tránsito', 'Frontera El Guasaule', 'En ruta hacia Guatemala'),
(2, 'Entregado', 'Guatemala City, Guatemala', 'Entregado exitosamente al destinatario'),
(3, 'Paquete recibido', 'Granada, Nicaragua', 'Paquete recibido y verificado'),
(4, 'Paquete recibido', 'Managua, Nicaragua', 'Paquete recibido para envío a El Salvador'),
(4, 'En tránsito', 'Frontera Las Manos', 'En ruta hacia El Salvador'),
(5, 'Paquete recibido', 'Managua, Nicaragua', 'Paquete grande recibido y pesado');

-- Insertar facturas
INSERT INTO invoices (invoice_number, shipment_id, customer_id, dgi_number, subtotal, tax_amount, total, status, issue_date, due_date) VALUES
('FAC-001234', 1, 1, '001-001-01-00001234', 450.00, 67.50, 517.50, 'pending', '2024-01-15', '2024-01-30'),
('FAC-001235', 2, 2, '001-001-01-00001235', 320.00, 48.00, 368.00, 'paid', '2024-01-10', '2024-01-25'),
('FAC-001236', 3, 3, '001-001-01-00001236', 280.00, 42.00, 322.00, 'overdue', '2024-01-08', '2024-01-23'),
('FAC-001237', 4, 4, '001-001-01-00001237', 380.00, 57.00, 437.00, 'pending', '2024-01-16', '2024-01-31'),
('FAC-001238', 5, 5, '001-001-01-00001238', 650.00, 97.50, 747.50, 'pending', '2024-01-17', '2024-02-01');

-- Insertar tickets de soporte
INSERT INTO support_tickets (ticket_number, customer_id, shipment_id, subject, description, category, priority, status) VALUES
('TKT-001', 1, 1, 'Consulta sobre estado de envío', 'Quisiera saber el estado actual de mi paquete TRK-001234567', 'Información general', 'medium', 'open'),
('TKT-002', 2, 2, 'Confirmación de entrega', 'Necesito confirmación oficial de que el paquete fue entregado', 'Problema con entrega', 'low', 'resolved'),
('TKT-003', 3, NULL, 'Cotización para envío múltiple', 'Necesito cotización para enviar 5 paquetes a Honduras', 'Información general', 'medium', 'in_progress'),
('TKT-004', 4, 4, 'Cambio de dirección de entrega', 'Necesito cambiar la dirección de entrega de mi paquete', 'Cambio de dirección', 'high', 'open');

-- Insertar respuestas a tickets
INSERT INTO ticket_responses (ticket_id, user_id, message, is_internal) VALUES
(1, 2, 'Hola María, su paquete está actualmente en tránsito hacia Costa Rica. Estimamos que llegará el 18 de enero.', FALSE),
(2, 2, 'Confirmamos que su paquete fue entregado exitosamente el 13 de enero a las 2:30 PM.', FALSE),
(3, 1, 'Cliente solicita cotización múltiple - asignar a equipo comercial', TRUE),
(3, 2, 'Hola Ana, le enviaremos la cotización detallada a su correo en las próximas 2 horas.', FALSE);

-- Insertar configuraciones de integración
INSERT INTO integrations (name, type, config, is_active) VALUES
('WhatsApp Business', 'messaging', '{"api_key": "", "phone_number": "+50512345678", "webhook_url": ""}', FALSE),
('Twilio SMS', 'sms', '{"account_sid": "", "auth_token": "", "from_number": ""}', FALSE),
('SendGrid Email', 'email', '{"api_key": "", "from_email": "noreply@enviosnica.com"}', FALSE),
('DGI Nicaragua', 'billing', '{"certificate_path": "", "environment": "test"}', FALSE),
('n8n Automation', 'automation', '{"webhook_url": "", "api_key": ""}', FALSE);

-- Insertar notificaciones de ejemplo
INSERT INTO notifications (type, recipient_type, recipient_id, title, message, channel, status) VALUES
('shipment_created', 'customer', 1, 'Envío creado', 'Su envío TRK-001234567 ha sido registrado exitosamente', 'email', 'sent'),
('shipment_in_transit', 'customer', 1, 'Envío en tránsito', 'Su paquete está en camino hacia Costa Rica', 'sms', 'sent'),
('invoice_generated', 'customer', 2, 'Factura generada', 'Se ha generado la factura FAC-001235 por C$ 368.00', 'email', 'sent'),
('ticket_created', 'user', 2, 'Nuevo ticket de soporte', 'Se ha creado el ticket TKT-004 - Cambio de dirección', 'email', 'pending');
