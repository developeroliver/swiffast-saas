export interface Product {
  id: string;
  name: string;
  description: string | null;
  stripeId: string;
}

export interface PurchaseStatus {
  hasPremium: boolean;
  hasStarter: boolean;
  productsCount: number;
  products: Product[];
}

export interface EmailData {
  userFirstName: string;
  userEmail: string;
  productName: string;
  productDescription: string;
  purchaseAmount: number;
  currency: string;
  purchaseDate: Date;
  isPremium: boolean;
}

export interface GitHubRequest {
  id: string;
  user_id: string;
  github_username: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  processed_at?: string;
}
