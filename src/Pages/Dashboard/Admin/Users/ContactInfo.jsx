export const ContactInfo = () => {
  return (
    <>
       <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <button
              className="justify-center whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md px-3 font-semibold leading-none flex items-center h-8"
              type="button"
              id="radix-:R5dafnnja:"
              aria-haspopup="menu"
              aria-expanded="false"
              data-state="closed"
            >
              All Contacts
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 ml-2"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">
              New Contact
            </button>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800" />
        </div>
    </>
  );
};