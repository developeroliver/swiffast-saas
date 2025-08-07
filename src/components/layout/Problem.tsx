import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function Problem() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            No more waiting <span className="text-red-500">3 month</span> to set
            up an iOS app
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            How much time do you waste recoding the same architecture on each
            project?
          </p>
        </div>

        {/* Avant / Après */}
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Avant */}
          <Card className="border-red-200 bg-red-50 dark:bg-red-950/20">
            <CardHeader>
              <CardTitle className="text-red-700 dark:text-red-400 flex items-center">
                <span className="text-2xl mr-3">😤</span>
                BEFORE SwiftFast
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="text-red-500">❌</div>
                <div>
                  <strong>3 months minimum</strong> to set up the architecture
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-red-500">❌</div>
                <div>
                  <strong>Spaghetti code</strong> hard to maintain
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-red-500">❌</div>
                <div>
                  <strong>Auth, paiements, push</strong> to be repeated each
                  time
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-red-500">❌</div>
                <div>
                  <strong>Recurring bugs</strong> and time wasted debugging
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-red-500">❌</div>
                <div>
                  <strong>Impatient customers</strong> who wait for months
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Après */}
          <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
            <CardHeader>
              <CardTitle className="text-green-700 dark:text-green-400 flex items-center">
                <span className="text-2xl mr-3">🚀</span>
                WITH SwiftFast
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="text-green-500">✅</div>
                <div>
                  <strong>1 week for a complete app</strong> ready for the App
                  Store
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-green-500">✅</div>
                <div>
                  <strong>an application idea</strong> kept the focus on the
                  core of the app
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-green-500">✅</div>
                <div>
                  <strong>Clean Architecture</strong> + MVVM + Dependency
                  Injection
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-green-500">✅</div>
                <div>
                  <strong>Auth, paiements, push</strong> already set up
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="text-green-500">✅</div>
                <div>
                  <strong>Satisfied customers</strong> with a record
                  time-to-market
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
