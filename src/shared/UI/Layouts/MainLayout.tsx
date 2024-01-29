export const MainLayout = ({
  children,
  navigation,
}: {
  children: React.ReactNode;
  navigation?: React.ReactNode;
}) => {
  return (
    <div className="h-full flex dark:bg-[#1f1f1f]">
      {navigation}
      <main className="flex-1 h-full overflow-y-auto">{children}</main>
    </div>
  );
};
