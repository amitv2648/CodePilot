type StatsCardProps = {
    title: string;
    value: string;
    subtitle: string;
  };
  
  function StatsCard({ title, value, subtitle }: StatsCardProps) {
    return (
      <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 transition-all hover:border-blue-500 hover:-translate-y-1">
  
        <p className="text-sm text-slate-400">
          {title}
        </p>
  
        <h2 className="mt-2 text-3xl font-bold text-white">
          {value}
        </h2>
  
        <p className="mt-3 text-sm text-slate-500">
          {subtitle}
        </p>
  
      </div>
    );
  }
  
  export default StatsCard;