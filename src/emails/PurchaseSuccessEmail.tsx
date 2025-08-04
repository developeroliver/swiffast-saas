import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface PurchaseSuccessEmailProps {
  userFirstName: string;
  productName: string;
  productDescription: string;
  purchaseAmount: string;
  purchaseDate: string;
  isPremium: boolean;
  dashboardUrl: string;
  premiumUrl: string;
  supportEmail: string;
  appName: string;
}

export const PurchaseSuccessEmail = ({
  userFirstName = "John",
  productName = "Accès Premium",
  productDescription = "Accès complet à toutes les fonctionnalités premium",
  purchaseAmount = "29,99€",
  purchaseDate = "15 décembre 2024",
  isPremium = true,
  dashboardUrl = "https://monssaas.com/dashboard",
  premiumUrl = "https://monssaas.com/premium",
  supportEmail = "support@monssaas.com",
  appName = "Mon SaaS",
}: PurchaseSuccessEmailProps) => {
  const previewText = `Votre achat ${productName} a été confirmé !`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={h1}>🎉 Félicitations !</Heading>
            <Text style={headerText}>
              Votre achat a été confirmé avec succès
            </Text>
          </Section>

          {/* Greeting */}
          <Section>
            <Text style={text}>
              Bonjour <strong>{userFirstName}</strong>,
            </Text>
            <Text style={text}>
              Merci pour votre confiance ! Votre paiement pour{" "}
              <strong>{productName}</strong> a été traité avec succès.
            </Text>
          </Section>

          {/* Purchase Details */}
          <Section style={purchaseBox}>
            <Heading as="h2" style={h2}>
              📋 Détails de votre achat
            </Heading>
            <Text style={purchaseDetail}>
              <strong>Produit :</strong> {productName}
            </Text>
            <Text style={purchaseDetail}>
              <strong>Description :</strong> {productDescription}
            </Text>
            <Text style={purchaseDetail}>
              <strong>Montant :</strong> {purchaseAmount}
            </Text>
            <Text style={purchaseDetail}>
              <strong>Date :</strong> {purchaseDate}
            </Text>
          </Section>

          {/* Next Steps */}
          <Section>
            <Heading as="h2" style={h2}>
              🚀 Prochaines étapes
            </Heading>

            <div style={stepContainer}>
              <Text style={stepNumber}>1.</Text>
              <div>
                <Text style={stepTitle}>Connectez-vous à votre compte</Text>
                <Text style={stepDescription}>
                  Accédez à votre tableau de bord personnel
                </Text>
                <Button style={secondaryButton} href={dashboardUrl}>
                  Ouvrir le Dashboard
                </Button>
              </div>
            </div>

            {isPremium && (
              <div style={stepContainer}>
                <Text style={stepNumber}>2.</Text>
                <div>
                  <Text style={stepTitle}>Explorez votre contenu premium</Text>
                  <Text style={stepDescription}>
                    Découvrez toutes les fonctionnalités exclusives
                  </Text>
                  <Button style={primaryButton} href={premiumUrl}>
                    Accéder au Premium
                  </Button>
                </div>
              </div>
            )}

            <div style={stepContainer}>
              <Text style={stepNumber}>{isPremium ? "3." : "2."}</Text>
              <div>
                <Text style={stepTitle}>Besoin d&apos;aide ?</Text>
                <Text style={stepDescription}>
                  Notre équipe est là pour vous accompagner
                </Text>
                <Link href={`mailto:${supportEmail}`} style={linkStyle}>
                  {supportEmail}
                </Link>
              </div>
            </div>
          </Section>

          <Hr style={hr} />

          {/* CTA Section */}
          <Section style={ctaSection}>
            <Button
              style={primaryButton}
              href={isPremium ? premiumUrl : dashboardUrl}
            >
              {isPremium
                ? "🎯 Accéder à mon contenu Premium"
                : "📊 Voir mon Dashboard"}
            </Button>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Merci de faire partie de la communauté {appName} !
            </Text>
            <Text style={footerText}>L&apos;équipe {appName}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "600px",
};

const header = {
  padding: "32px 24px",
  textAlign: "center" as const,
  backgroundColor: "#f8fafc",
  borderRadius: "8px 8px 0 0",
};

const h1 = {
  color: "#1a1a1a",
  fontSize: "32px",
  fontWeight: "bold",
  margin: "0 0 8px",
  textAlign: "center" as const,
};

const h2 = {
  color: "#2d3748",
  fontSize: "20px",
  fontWeight: "bold",
  margin: "24px 0 16px",
};

const headerText = {
  color: "#64748b",
  fontSize: "16px",
  margin: "0",
  textAlign: "center" as const,
};

const text = {
  color: "#4a5568",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "16px 24px",
};

const purchaseBox = {
  backgroundColor: "#f0f9ff",
  border: "1px solid #bae6fd",
  borderRadius: "8px",
  margin: "24px",
  padding: "24px",
};

const purchaseDetail = {
  color: "#1e40af",
  fontSize: "14px",
  margin: "8px 0",
};

const stepContainer = {
  display: "flex",
  margin: "24px",
  alignItems: "flex-start",
};

const stepNumber = {
  backgroundColor: "#3b82f6",
  color: "white",
  borderRadius: "50%",
  width: "24px",
  height: "24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "14px",
  fontWeight: "bold",
  marginRight: "16px",
  flexShrink: 0,
};

const stepTitle = {
  color: "#2d3748",
  fontSize: "16px",
  fontWeight: "bold",
  margin: "0 0 4px",
};

const stepDescription = {
  color: "#64748b",
  fontSize: "14px",
  margin: "0 0 12px",
};

const primaryButton = {
  backgroundColor: "#3b82f6",
  borderRadius: "6px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
  margin: "8px 0",
};

const secondaryButton = {
  backgroundColor: "#f1f5f9",
  borderRadius: "6px",
  color: "#475569",
  fontSize: "14px",
  fontWeight: "500",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "8px 16px",
  margin: "8px 0",
  border: "1px solid #e2e8f0",
};

const linkStyle = {
  color: "#3b82f6",
  textDecoration: "underline",
};

const ctaSection = {
  textAlign: "center" as const,
  margin: "32px 24px",
};

const hr = {
  borderColor: "#e2e8f0",
  margin: "32px 24px",
};

const footer = {
  textAlign: "center" as const,
  margin: "32px 24px 0",
};

const footerText = {
  color: "#64748b",
  fontSize: "14px",
  margin: "8px 0",
};

export default PurchaseSuccessEmail;
