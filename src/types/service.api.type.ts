export type TServiceCreationPayload = {
  description: string;
  price: number;
  isActive: boolean;
};

export type TServiceUpdatePayload = {
  description?: string;
  price?: number;
  isActive?: boolean;
};
