import Card from "./glassCard"
const gridItems = [
  { id: 1, component: <div className="h-48 bg-white/5 rounded-lg">Placeholder 1</div>, span: "col-span-1" },
];

export default function DashboardGrid() {
  return (
    <div className="grid w-full grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8 pt-4">
      {gridItems.map((item) => (
        <Card key={item.id} className={`${item.span} relative p-6`}>
          {item.component}
        </Card>
      ))}
    </div>
  );
}