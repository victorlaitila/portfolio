export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-muted-foreground">
          <p className="text-sm">
            © {currentYear} Victor Laitila
          </p>
          <p className="text-xs mt-2">
            Designed & Developed with passion
          </p>
        </div>
      </div>
    </footer>
  );
}
