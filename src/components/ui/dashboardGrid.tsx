import Card from "./glassCard"
const gridItems = [
  { id: 1, component: <div className="h-48 bg-white/5 rounded-lg">Placeholder 1</div>, span: "col-span-1" },
];

export default function DashboardGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {gridItems.map((item) => (
        <Card key={item.id} className={`${item.span} relative p-6`}>
          {item.component}
        </Card>
      ))}
    </div>
  );
}