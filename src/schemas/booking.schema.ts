// src/swagger/schemas.ts
export const BookingSchema = {
  type: "object",
  properties: {
    id: {
      type: "integer",
      example: 42,
      description: "Identificador único do agendamento",
    },
    roomId: {
      type: "integer",
      example: 3,
      description: "ID da sala vinculada ao agendamento",
    },
    userId: {
      type: "integer",
      example: 7,
      description: "ID do usuário que realizou o agendamento",
    },
    startTime: {
      type: "string",
      format: "date-time",
      example: "2025-11-05T08:00:00Z",
      description: "Data e hora de início do agendamento (UTC)",
    },
    endTime: {
      type: "string",
      format: "date-time",
      example: "2025-11-05T10:00:00Z",
      description: "Data e hora de término do agendamento (UTC)",
    },
    purpose: {
      type: "string",
      nullable: true,
      example: "Aula prática de biologia molecular",
      description: "Motivo ou finalidade do agendamento (opcional)",
    },
    description: {
      type: "string",
      nullable: true,
      example: "Trazer equipamentos especiais para a aula",
      description: "Descrição adicional do agendamento (opcional)",
    },
    status: {
      type: "string",
      enum: ["confirmed", "pending", "cancelled"],
      example: "confirmed",
      description:
        "Status do agendamento, podendo ser 'confirmed', 'pending' ou 'cancelled'",
    },
    createdAt: {
      type: "string",
      format: "date-time",
      example: "2025-10-29T14:00:00Z",
      description: "Data de criação do registro",
    },
    updatedAt: {
      type: "string",
      format: "date-time",
      example: "2025-10-29T14:30:00Z",
      description: "Data da última atualização do registro",
    },
    room: {
      $ref: "#/components/schemas/Room",
      description: "Dados da sala associada (objeto Room completo)",
    },
    user: {
      $ref: "#/components/schemas/User",
      description: "Dados do usuário associado (objeto User completo)",
    },
  },
  required: ["roomId", "userId", "startTime", "endTime"],
};
