import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Settings,
  Smartphone,
  Code,
  Zap,
  CheckCircle,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-8 left-4 z-30">
        <Button variant="outline" size="sm" asChild>
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Link>
        </Button>
      </div>
      {/* Header */}
      <div className="bg-background border-b">
        <div className="container mx-auto px-4 py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-foreground mb-">
              📚 SwiftFast Documentation
            </h1>
            <p className="text-xl text-gray-400">
              Complete guide to using your SwiftUI boilerplate and creating
              professional iOS apps quickly.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Navigation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <a
                    href="#getting-started"
                    className="block text-sm hover:text-blue-600 transition-colors"
                  >
                    🚀 Démarrage rapide
                  </a>
                  <a
                    href="#installation"
                    className="block text-sm hover:text-blue-600 transition-colors"
                  >
                    ⚙️ Installation
                  </a>
                  <a
                    href="#configuration"
                    className="block text-sm hover:text-blue-600 transition-colors"
                  >
                    🔧 Configuration
                  </a>
                  <a
                    href="#features"
                    className="block text-sm hover:text-blue-600 transition-colors"
                  >
                    ✨ Fonctionnalités
                  </a>
                  <a
                    href="#customization"
                    className="block text-sm hover:text-blue-600 transition-colors"
                  >
                    🎨 Personnalisation
                  </a>
                  <a
                    href="#deployment"
                    className="block text-sm hover:text-blue-600 transition-colors"
                  >
                    🚢 Déploiement
                  </a>
                  <a
                    href="#support"
                    className="block text-sm hover:text-blue-600 transition-colors"
                  >
                    💬 Support
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-12">
            {/* Getting Started */}
            <section id="getting-started">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                🚀 Démarrage rapide
              </h2>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                      Vous avez acheté SwiftFast !
                    </CardTitle>
                    <CardDescription>
                      Voici les étapes pour commencer avec votre boilerplate
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ol className="list-decimal list-inside space-y-3 text-gray-400">
                      <li>
                        Depuis dashboard entrer votre usernameGitHub et valider
                      </li>
                      <li>
                        Acceptez l&apos;invitation GitHub pour accéder au
                        repository privé
                      </li>

                      <li>Clonez le projet sur votre machine</li>
                      <li>Renommez le projet</li>
                      <li>
                        Ouvrez le fichier{" "}
                        <code className="bg-gray-100 px-2 py-1 rounded">
                          .xcodeproj
                        </code>{" "}
                        dans Xcode
                      </li>
                      <li>
                        Configurez vos clés API (voir section Configuration)
                      </li>
                      <li>
                        Lancez l&apos;application et commencez à développer !
                      </li>
                    </ol>
                  </CardContent>
                </Card>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-2">
                        Prérequis
                      </h3>
                      <ul className="text-blue-800 space-y-1">
                        <li>• macOS 12.0 ou plus récent</li>
                        <li>• Xcode 14.0 ou plus récent</li>
                        <li>• iOS 15.0+ comme target minimum</li>
                        <li>
                          • Compte développeur Apple (pour les tests sur device)
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Installation */}
            <section id="installation">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                ⚙️ Installation
              </h2>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>1. Télécharger le projet</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                        <p># Via GitHub (recommandé)</p>
                        <p>
                          git clone
                          https://github.com/votre-username/swiftfast.git
                        </p>
                        <p>cd swiftfast</p>
                      </div>
                      <p className="text-gray-400">
                        Ou téléchargez directement le ZIP depuis votre dashboard
                        SwiftUI Pro.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>2. Renommer le projet</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                        <p># Renommez le projet</p>
                        <p>swift scripts/rename.swift SwiftFast VotreProjet</p>
                      </div>
                      <p className="text-gray-400">
                        Changer le nom du projet avant de l&apos;ouvrir dans
                        Xcode.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>3. Ouvrir dans Xcode</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                        <p># Ouvrir le projet</p>
                        <p>open VotreProjet.xcodeproj</p>
                      </div>
                      <p className="text-gray-400">
                        Le projet s&apos;ouvrira automatiquement dans Xcode avec
                        toutes les dépendances configurées.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>3. Premier lancement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <ol className="list-decimal list-inside space-y-2 text-gray-400">
                        <li>
                          Sélectionnez votre simulateur iOS (iPhone 15 Pro
                          recommandé)
                        </li>
                        <li>
                          Appuyez sur{" "}
                          <kbd className="bg-gray-100 px-2 py-1 rounded">
                            ⌘ + R
                          </kbd>{" "}
                          pour lancer
                        </li>
                        <li>
                          L&apos;application se compile et se lance
                          automatiquement
                        </li>
                        <li>
                          Vous verrez l&apos;écran d&apos;onboarding par défaut
                        </li>
                      </ol>

                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                          <span className="text-green-800 font-medium">
                            Si l&apos;app se lance sans erreur,
                            l&apos;installation est réussie !
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Configuration */}
            <section id="configuration">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                🔧 Configuration
              </h2>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Variables d&apos;environnement</CardTitle>
                    <CardDescription>
                      Configurez vos clés API dans le fichier le dossier
                      /Shared/Constants/Keys.swift
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`// Keys.swift
struct Keys {
    static let revenueCatAPIKey = ""
    static let wishKitAPIKey = ""
}`}</pre>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Configuration Firebase</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="list-decimal list-inside space-y-2 text-gray-400">
                      <li>
                        Créez un projet Firebase sur{" "}
                        <a
                          href="https://console.firebase.google.com"
                          className="text-blue-600 hover:underline"
                        >
                          console.firebase.google.com
                        </a>
                      </li>
                      <li>Ajoutez une application iOS</li>
                      <li>
                        Téléchargez le fichier{" "}
                        <code className="bg-gray-100 px-2 py-1 rounded">
                          GoogleService-Info.plist
                        </code>
                      </li>
                      <li>Glissez le fichier dans votre projet Xcode</li>
                      <li>
                        Activez Authentication et Analytics dans la console
                      </li>
                      <li>Voir la section Authentification</li>
                    </ol>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Configuration Stripe</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="list-decimal list-inside space-y-2 text-gray-400">
                      <li>
                        Créez un compte Revenue sur{" "}
                        <a
                          href="https://www.revenuecat.com/"
                          className="text-blue-600 hover:underline"
                        >
                          stripe.com
                        </a>
                      </li>
                      <li>Récupérez votre clé publique</li>
                      <li>
                        Ajoutez-la dans{" "}
                        <code className="bg-gray-100 px-2 py-1 rounded">
                          Keys.swift
                        </code>
                      </li>
                      <li>Voir la section Abonnements</li>
                    </ol>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Features */}
            <section id="features">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                ✨ Fonctionnalités incluses
              </h2>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Smartphone className="mr-2 h-5 w-5 text-blue-600" />
                      Interface utilisateur
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-400">
                      <li>• Écrans d&apos;onboarding animés</li>
                      <li>• Système de navigation avancé</li>
                      <li>• Mode sombre/clair automatique</li>
                      <li>• Composants réutilisables</li>
                      <li>• Animations fluides</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="mr-2 h-5 w-5 text-blue-600" />
                      Authentification
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-400">
                      <li>• Login/Signup complet</li>
                      <li>• Connexion via Apple</li>
                      <li>• Biométrie (Face ID)</li>
                      <li>• Protection pour la suppression de compte</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Code className="mr-2 h-5 w-5 text-blue-600" />
                      Architecture
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-400">
                      <li>• Clean Architecture + UseCase</li>
                      <li>• MVVM</li>
                      <li>• Dependency Injection</li>
                      <li>• Repository Pattern</li>
                      <li>• Unit Tests inclus</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Zap className="mr-2 h-5 w-5 text-blue-600" />
                      Intégrations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-400">
                      <li>• Paiements RevenueCat</li>
                      <li>• RevenueCat Paywall + Custom Paywall</li>
                      <li>• Notifications push</li>
                      <li>• Analytics intégrées</li>
                      <li>• Multi-langages</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Customization */}
            <section id="customization">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                🎨 Personnalisation
              </h2>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Couleurs et thème</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 mb-4">
                      Personnalisez facilement les couleurs de votre app dans le
                      fichier{" "}
                      <code className="bg-gray-100 px-2 py-1 rounded">
                        Theme.swift
                      </code>{" "}
                      :
                    </p>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                      <pre>{`// Font+EXT.swift
import SwiftUI

/// Enum that defines the different font sizes used in the application.
enum FontSize {
    case largeTitle
    case title
    case title2
    case title3
    case headline
    case subheadline
    case body
    case callout
    case footnote
    case caption
    case caption2
    case custom(CGFloat)

    var dynamicFont: Font {
        switch self {
        case .largeTitle:
            return Font.largeTitle
        case .title:
            return Font.title
        case .title2:
            return Font.title2
        case .title3:
            return Font.title3
        case .headline:
            return Font.headline
        case .subheadline:
            return Font.subheadline
        case .body:
            return Font.body
        case .callout:
            return Font.callout
        case .footnote:
            return Font.footnote
        case .caption:
            return Font.caption
        case .caption2:
            return Font.caption2
        case .custom(let value):
            return Font.system(size: value, weight: .regular, design: .default)
        }
    }
}

extension Font {
    static func special(_ size: FontSize, weight: FontStyle) -> Font {
        // Applique une police dynamique tout en respectant le style de police
        let dynamicFont = size.dynamicFont
        
        // Convertir FontStyle en Font.Weight (selon le style choisi)
        let fontWeight = weight.toFontWeight()
        
        // Appliquer la police avec le poids dynamique
        return dynamicFont.weight(fontWeight)
    }
}

// Extension pour convertir FontStyle en Font.Weight
extension FontStyle {
    func toFontWeight() -> Font.Weight {
        switch self {
        case .extraLight:
            return .ultraLight
        case .light:
            return .light
        case .regular:
            return .regular
        case .medium:
            return .medium
        case .semibold:
            return .semibold
        case .bold:
            return .bold
        case .black:
            return .heavy
        }
    }
}

/// Enum that defines the different font styles used in the application.
enum FontStyle: String {
    case extraLight = "BricolageGrotesque-ExtraLight"
    case light = "BricolageGrotesque-Light"
    case regular = "BricolageGrotesque-Regular"
    case medium = "BricolageGrotesque-Medium"
    case semibold = "BricolageGrotesque-SemiBold"
    case bold = "BricolageGrotesque-Bold"
    case black = "BricolageGrotesque-ExtraBold"
}
`}</pre>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Polices personnalisées</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="list-decimal list-inside space-y-2 text-gray-400">
                      <li>
                        Ajoutez vos fichiers de police (.ttf, .otf) au projet
                      </li>
                      <li>
                        Déclarez-les dans{" "}
                        <code className="bg-gray-100 px-2 py-1 rounded">
                          Info.plist
                        </code>
                      </li>
                      <li>
                        Utilisez-les via{" "}
                        <code className="bg-gray-100 px-2 py-1 rounded">
                          .font(.special(.largeTitle, weight: .bold))
                        </code>
                      </li>
                      <li>Appliquez-les globalement ou par écran</li>
                    </ol>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Icônes et images</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-400">
                      <li>
                        • Remplacez l&apos;icône d&apos;app dans{" "}
                        <code className="bg-gray-100 px-2 py-1 rounded">
                          Assets.xcassets
                        </code>
                      </li>
                      <li>• Ajoutez vos images dans le même dossier</li>
                      <li>• Utilisez SF Symbols pour les icônes système</li>
                      <li>
                        • Support automatique des différentes tailles
                        d&apos;écran
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Deployment */}
            <section id="deployment">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                🚢 Déploiement
              </h2>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Préparer pour l&apos;App Store</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="list-decimal list-inside space-y-3 text-gray-400">
                      <li>
                        <strong>Configurez votre Bundle ID</strong>
                        <p className="text-sm text-gray-500 mt-1">
                          Changez{" "}
                          <code className="bg-gray-100 px-2 py-1 rounded">
                            com.yourcompany.appname
                          </code>{" "}
                          dans les réglages du projet
                        </p>
                      </li>
                      <li>
                        <strong>Créez un App ID sur Apple Developer</strong>
                        <p className="text-sm text-gray-600 mt-1">
                          Allez sur{" "}
                          <a
                            href="https://developer.apple.com"
                            className="text-blue-600 hover:underline"
                          >
                            developer.apple.com
                          </a>{" "}
                          → Certificates, IDs & Profiles
                        </p>
                      </li>
                      <li>
                        <strong>Configurez les certificats</strong>
                        <p className="text-sm text-gray-600 mt-1">
                          Xcode peut les générer automatiquement via
                          &quot;Automatically manage signing&quot;
                        </p>
                      </li>
                      <li>
                        <strong>Testez sur device réel</strong>
                        <p className="text-sm text-gray-600 mt-1">
                          Connectez votre iPhone et testez toutes les
                          fonctionnalités
                        </p>
                      </li>
                      <li>
                        <strong>Archive et upload</strong>
                        <p className="text-sm text-gray-600 mt-1">
                          Product → Archive, puis &quot;Distribute App&quot;
                          vers App Store Connect
                        </p>
                      </li>
                    </ol>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Checklist de déploiement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {[
                        "Icône d'app configurée (toutes les tailles)",
                        "Nom d'app et descriptions remplis",
                        "Screenshots App Store préparés",
                        "Clés API de production configurées",
                        "Politique de confidentialité créée",
                        "Tests sur différents devices",
                        "Version de build incrémentée",
                      ].map((item, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Support */}
            <section id="support">
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="outline" asChild>
                    <Link href="/dashboard">🎯 Retour au Dashboard</Link>
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
