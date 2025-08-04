import { Button } from "../ui/button";

export default function Demo() {
  return (
    <section
      id="demo"
      className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-md"
    >
      <div className="container-custom px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-400">
              Architecture designed for production
            </h2>
            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <svg
                  className="w-6 h-6 text-green-400 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <h3 className="font-semibold text-gray-400">
                    Clean Architecture + UseCase & MVVM
                  </h3>
                  <p className="text-gray-500">
                    Scalable and maintainable architecture for your projects
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <svg
                  className="w-6 h-6 text-green-400 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <h3 className="font-semibold text-gray-400">
                    Dependecies injection
                  </h3>
                  <p className="text-gray-500">
                    Injects dependencies to make the code more flexible and
                    testable.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <svg
                  className="w-6 h-6 text-green-400 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <h3 className="font-semibold text-gray-400">
                    Swift Data + iCloud folder
                  </h3>
                  <p className="text-gray-500">
                    Cloud-native and offline-first synchronization
                  </p>
                </div>
              </div>
            </div>
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="hover-lift"
            >
              <a href="/documentation">
                See the documentation
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </a>
            </Button>
          </div>

          <div className="relative">
            <div className="bg-gray-900 rounded-lg p-6 font-mono text-sm text-green-400 overflow-x-auto border border-gray-700 shadow-2xl">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-500 ml-4">DataModel.swift</span>
              </div>
              <div className="mb-2 text-gray-500"></div>
              <div className="space-y-1 text-sm">
                <div>
                  <span className="text-purple-400">@Model</span>{" "}
                </div>
                <div>
                  <span className="text-purple-400">class</span>{" "}
                  <span className="text-blue-400">DataModel</span>: {"{"}
                </div>
                <div className="ml-4">
                  <span className="text-purple-400">var</span>{" "}
                  <span className="text-blue-400">id</span> = UUID()
                </div>
                <div className="ml-4">
                  <span className="text-purple-400">var</span>{" "}
                  <span className="text-blue-400">title</span>: String
                </div>
                <div className="ml-4"></div>
                <div className="ml-4">
                  <span className="text-purple-400">var</span>{" "}
                  <span className="text-blue-400">content</span>: String
                </div>
                <div className="ml-4">
                  <span className="text-purple-400">var</span>{" "}
                  <span className="text-blue-400">platform</span>:
                  SocialPlatform
                </div>
                <div className="ml-4">
                  <span className="text-purple-400">var</span>{" "}
                  <span className="text-blue-400">createdAt</span>: Date
                </div>
                <div className="ml-4">
                  <span className="text-purple-400">var</span>{" "}
                  <span className="text-blue-400">updatedAt</span>: Date
                </div>
                <div className="ml-4">
                  <span className="text-purple-400">var</span>{" "}
                  <span className="text-blue-400">reminderTime</span>: Date =
                  Date()
                </div>
                <div>{"}"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
