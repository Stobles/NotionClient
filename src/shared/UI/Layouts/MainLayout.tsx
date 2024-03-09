export const MainLayout = ({
  children,
  navigation,
  footer,
}: {
  children: React.ReactNode;
  navigation?: React.ReactNode;
  footer?: React.ReactNode;
}) => {
  return (
    <div className="h-full flex dark:bg-[#1f1f1f]">
      {navigation}
      <main className="flex-1 h-[calc(100%-3rem)] overflow-y-auto mt-12">
        {children}
      </main>
    </div>
  );
};
