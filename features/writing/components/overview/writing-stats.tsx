const stats=[

{
title:"تعداد نوشته‌ها",
value:"18",
color:"#00685F",
},

{
title:"واژگان تولید شده",
value:"6,400",
color:"#712AE2",
},

{
title:"میانگین امتیاز",
value:"81%",
color:"#00685F",
},

{
title:"تداوم تمرین",
value:"۶ روز",
color:"#F97316",
},

];


export function WritingStats(){


return (

<section
className="
grid
grid-cols-2
gap-4
lg:grid-cols-4
"
>

{
stats.map(
(item)=>(

<div
key={item.title}
className="
rounded-3xl
border
bg-white
p-6
shadow-sm
"
>


<div
className="
flex
items-center
gap-4
"
>

<div
className="
h-12
w-12
rounded-full
bg-slate-100
"
/>


<div>

<p
className="
text-xs
text-[#3D4947]
"
>
{item.title}
</p>


<strong
className="
text-xl
font-bold
text-[#191C1E]
"
>
{item.value}
</strong>


</div>


</div>


</div>


)

)
}


</section>


)

}