export type SubscriptionPlan = Readonly<{
  id: string;
  title: string;
  price: string;
  description: string;
  features: readonly string[];
  featured?: boolean;
  badge?: string;
}>;
