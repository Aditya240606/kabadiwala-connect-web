export interface PricingRateDto {
  id?: string;
  categoryCode: string;
  pricePerKg: number;
  currency: string;
  effectiveFrom?: string;
  active?: boolean;
}
