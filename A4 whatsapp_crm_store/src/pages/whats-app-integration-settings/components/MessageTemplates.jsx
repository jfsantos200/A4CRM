import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const MessageTemplates = ({ templates, onSaveTemplate, onDeleteTemplate }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'greeting',
    content: '',
    variables: []
  });

  const categories = [
    { value: 'greeting', label: 'Saludo', icon: 'Hand' },
    { value: 'order_confirmation', label: 'Confirmación de Pedido', icon: 'CheckCircle' },
    { value: 'shipping', label: 'Envío', icon: 'Truck' },
    { value: 'payment', label: 'Pago', icon: 'CreditCard' },
    { value: 'support', label: 'Soporte', icon: 'HelpCircle' },
    { value: 'promotion', label: 'Promoción', icon: 'Tag' },
    { value: 'follow_up', label: 'Seguimiento', icon: 'MessageCircle' }
  ];

  const handleCreateNew = () => {
    setIsCreating(true);
    setEditingTemplate(null);
    setFormData({
      name: '',
      category: 'greeting',
      content: '',
      variables: []
    });
  };

  const handleEdit = (template) => {
    setIsCreating(true);
    setEditingTemplate(template);
    setFormData({
      name: template.name,
      category: template.category,
      content: template.content,
      variables: template.variables || []
    });
  };

  const handleSave = () => {
    const templateData = {
      ...formData,
      id: editingTemplate?.id || Date.now(),
      updatedAt: new Date().toISOString()
    };
    
    onSaveTemplate(templateData);
    setIsCreating(false);
    setEditingTemplate(null);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingTemplate(null);
    setFormData({
      name: '',
      category: 'greeting',
      content: '',
      variables: []
    });
  };

  const getCategoryInfo = (categoryValue) => {
    return categories.find(cat => cat.value === categoryValue) || categories[0];
  };

  const extractVariables = (content) => {
    const matches = content.match(/\{\{([^}]+)\}\}/g);
    return matches ? matches.map(match => match.replace(/[{}]/g, '')) : [];
  };

  const handleContentChange = (content) => {
    const variables = extractVariables(content);
    setFormData({
      ...formData,
      content,
      variables
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="FileText" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Plantillas de Mensajes</h2>
            <p className="text-sm text-muted-foreground">Crea y gestiona plantillas reutilizables</p>
          </div>
        </div>
        <Button
          onClick={handleCreateNew}
          iconName="Plus"
          iconPosition="left"
        >
          Nueva Plantilla
        </Button>
      </div>

      {/* Create/Edit Form */}
      {isCreating && (
        <div className="mb-6 p-4 bg-muted/50 rounded-lg border border-border">
          <h3 className="text-sm font-medium text-foreground mb-4">
            {editingTemplate ? 'Editar Plantilla' : 'Nueva Plantilla'}
          </h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nombre de la Plantilla"
                type="text"
                placeholder="Ej: Bienvenida nueva cliente"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Categoría</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Contenido del Mensaje</label>
              <textarea
                value={formData.content}
                onChange={(e) => handleContentChange(e.target.value)}
                placeholder="Hola {{nombre}}, gracias por tu interés en nuestros productos..."
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Usa {`{{variable}}`} para insertar datos dinámicos
              </p>
            </div>

            {formData.variables.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Variables Detectadas</label>
                <div className="flex flex-wrap gap-2">
                  {formData.variables.map((variable, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary"
                    >
                      {variable}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <Button
                onClick={handleSave}
                disabled={!formData.name || !formData.content}
                iconName="Save"
                iconPosition="left"
              >
                {editingTemplate ? 'Actualizar' : 'Guardar'} Plantilla
              </Button>
              <Button
                variant="outline"
                onClick={handleCancel}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Templates List */}
      <div className="space-y-3">
        {templates.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No hay plantillas creadas</h3>
            <p className="text-muted-foreground">Crea tu primera plantilla para agilizar las comunicaciones</p>
          </div>
        ) : (
          templates.map((template) => {
            const categoryInfo = getCategoryInfo(template.category);
            return (
              <div
                key={template.id}
                className="border border-border rounded-lg p-4 hover:border-primary/50 transition-all duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-muted rounded-md flex items-center justify-center">
                        <Icon name={categoryInfo.icon} size={14} />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{template.name}</h3>
                        <span className="text-xs text-muted-foreground">{categoryInfo.label}</span>
                      </div>
                    </div>
                    
                    <div className="bg-muted/50 rounded-md p-3 mb-3">
                      <p className="text-sm text-foreground whitespace-pre-wrap">
                        {template.content}
                      </p>
                    </div>

                    {template.variables && template.variables.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {template.variables.map((variable, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-primary/10 text-primary"
                          >
                            {variable}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="text-xs text-muted-foreground">
                      Actualizada: {new Date(template.updatedAt).toLocaleDateString('es-ES')}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(template)}
                    >
                      <Icon name="Edit2" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeleteTemplate(template.id)}
                      className="text-error hover:text-error hover:bg-error/10"
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MessageTemplates;