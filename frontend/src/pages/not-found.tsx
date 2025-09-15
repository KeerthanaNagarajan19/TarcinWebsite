import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import DocumentHead from "../components/shared/DocumentHead";
import { useTranslations } from "../hooks/use-translations";

export default function NotFound() {
  const { t } = useTranslations();
  
  return (
    <>
      <DocumentHead 
        title="404 - Page Not Found | Tarcin Robotic LLP"
        description="The page you are looking for does not exist. Return to the Tarcin Robotic LLP homepage."
      />
      <div className="min-h-[80vh] w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <Card className="w-full max-w-md border border-gray-200 dark:border-gray-800 shadow-lg">
          <CardContent className="pt-10 pb-8 px-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-4">
                <AlertCircle className="h-10 w-10 text-red-500 dark:text-red-400" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">404 Page Not Found</h1>
              <p className="text-gray-600 dark:text-gray-400">
                We couldn't find the page you're looking for.
              </p>
            </div>
            
            <div className="flex justify-center mt-6">
              <Link href="/">
                <Button className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Return to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
