import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
} from "@react-email/components";

interface PurchaseConfirmationEmailProps {
  customerName: string;
  productName: string;
  amount: number;
  currency: string;
  orderNumber: string;
  dashboardLink?: string;
}

export default function PurchaseConfirmationEmail({
  customerName,
  productName,
  amount,
  currency,
  orderNumber,
  dashboardLink,
}: PurchaseConfirmationEmailProps) {
  const formattedAmount = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);

  return (
    <Html>
      <Head />
      <Body
        style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f6f9fc" }}
      >
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "8px",
            marginTop: "20px",
          }}
        >
          <Section>
            <Text
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                color: "#333",
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              🎉 Merci pour votre achat !
            </Text>

            <Text
              style={{
                fontSize: "16px",
                color: "#666",
                textAlign: "center",
                marginBottom: "30px",
              }}
            >
              Votre paiement a été traité avec succès
            </Text>

            <Text style={{ fontSize: "18px", color: "#333" }}>
              Bonjour <strong>{customerName}</strong>,
            </Text>

            <Text
              style={{ fontSize: "16px", color: "#666", lineHeight: "1.5" }}
            >
              Nous avons bien reçu votre paiement pour{" "}
              <strong>{productName}</strong>. Vous pouvez maintenant accéder à
              votre achat.
            </Text>

            <Hr style={{ margin: "30px 0" }} />

            <Section
              style={{
                backgroundColor: "#f8f9fa",
                padding: "24px",
                borderRadius: "8px",
                border: "1px solid #e9ecef",
              }}
            >
              <Text
                style={{
                  margin: "0 0 12px 0",
                  fontSize: "14px",
                  color: "#495057",
                }}
              >
                <strong>📋 Numéro de commande :</strong> {orderNumber}
              </Text>
              <Text
                style={{
                  margin: "0 0 12px 0",
                  fontSize: "14px",
                  color: "#495057",
                }}
              >
                <strong>🎯 Produit :</strong> {productName}
              </Text>
              <Text
                style={{
                  margin: "0",
                  fontSize: "14px",
                  color: "#495057",
                }}
              >
                <strong>💰 Montant :</strong> {formattedAmount}
              </Text>
            </Section>

            {dashboardLink && (
              <Section style={{ textAlign: "center", margin: "40px 0" }}>
                <Button
                  href={dashboardLink}
                  style={{
                    backgroundColor: "#007cba",
                    color: "white",
                    padding: "14px 28px",
                    textDecoration: "none",
                    borderRadius: "8px",
                    display: "inline-block",
                    fontSize: "16px",
                    fontWeight: "bold",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  🚀 Accéder à mon dashboard
                </Button>
              </Section>
            )}

            <Hr style={{ margin: "30px 0" }} />

            <Text
              style={{ fontSize: "14px", color: "#666", lineHeight: "1.5" }}
            >
              Si vous avez des questions concernant votre achat, n&apos;hésitez
              pas à nous contacter. Nous sommes là pour vous aider !
            </Text>

            <Text
              style={{ fontSize: "14px", color: "#666", marginTop: "20px" }}
            >
              Cordialement,
              <br />
              <strong>L&apos;équipe SwiftFast</strong>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
