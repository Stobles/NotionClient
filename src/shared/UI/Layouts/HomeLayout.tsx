interface HomeLayout {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const HomeLayout = ({ children, header, footer }: HomeLayout) => {
  return (
    <div className="min-h-full flex flex-col justify-between dark:bg-[#1F1F1F]">
      {header}
      <main className="h-full pt-20 w-full max-w-[1024px] mx-auto px-4">
        <div className="grid grid-cols-12 auto-rows-min w-full gap-x-6">
          {children}
        </div>
      </main>
      {footer}
    </div>
  );
};
