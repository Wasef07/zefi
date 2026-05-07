import Link from "next/link";
import Image from "next/image";

const Footer = () => {

  return (
    <footer className="bg-blue-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/">
              <Image
                src="/Logo.png"
                alt="Zefi Logo"
                width={100}
                height={60}
                className="h-10 w-auto object-contain mb-4"
                
              />
            </Link>
            <p className="text-gray-500 text-sm max-w-xs">
              Zefi helps you take control of your finances with AI-powered insights, 
              smart budgeting, and automated tracking.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link href="/dashboard" className="hover:text-blue-600 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/transaction/create" className="hover:text-blue-600 transition-colors">
                  Add Transaction
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-blue-600 transition-colors">
                  Accounts
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-4">Connect</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <a
                  href="https://github.com/Wasef07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/sk-wasef-mostafa-839a5428b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-100 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Zefi. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Made with ❤️ by{" "}
            <a
              href="https://www.linkedin.com/in/sk-wasef-mostafa-839a5428b/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Raze
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;