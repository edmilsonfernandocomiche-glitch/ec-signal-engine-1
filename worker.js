const API="https://otcharts.com";
const cors={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET,OPTIONS","Access-Control-Allow-Headers":"Content-Type","Cache-Control":"no-store"};
function json(x,s=200){return new Response(JSON.stringify(x),{status:s,headers:{"Content-Type":"application/json",...cors}})}
function headers(env){if(!env.OTCHARTS_API_KEY)throw Error("OTCHARTS_API_KEY não configurada");return{"Authorization":"Bearer "+env.OTCHARTS_API_KEY,"Accept":"application/json","User-Agent":"EC-Signal-Engine/4.1"}}
async function proxy(url,env){let r=await fetch(url,{headers:headers(env)}),t=await r.text();let x;try{x=JSON.parse(t)}catch{x={error:"Resposta inválida do OTCharts (HTTP "+r.status+")"}}return json(x,r.status)}
export default{async fetch(req,env){if(req.method==="OPTIONS")return new Response(null,{status:204,headers:cors});let u=new URL(req.url);try{
if(u.pathname==="/api/venues"){let [a,b]=await Promise.all([fetch(API+"/v1/venues",{headers:headers(env)}),fetch(API+"/v1/usage",{headers:headers(env)})]);return json({venues:await a.json(),usage:await b.json()})}
if(u.pathname==="/api/symbols")return proxy(API+"/v1/symbols?venue="+encodeURIComponent(u.searchParams.get("venue")||"otc"),env);
if(u.pathname==="/api/candles"){let p=new URLSearchParams();for(let k of["venue","symbol","tf","limit","before"])if(u.searchParams.has(k))p.set(k,u.searchParams.get(k));return proxy(API+"/v1/candles?"+p,env)}
if(u.pathname==="/api/stream"){let sym=u.searchParams.get("symbol");if(!sym)return json({error:"symbol obrigatório"},400);let r=await fetch(API+"/v1/stream?venue=otc&symbol="+encodeURIComponent(sym),{headers:{...headers(env),"Accept":"text/event-stream"}}),h=new Headers(cors);h.set("Content-Type","text/event-stream; charset=utf-8");return new Response(r.body,{status:r.status,headers:h})}
return json({error:"Rota não encontrada"},404)}catch(e){return json({error:e.message||String(e)},500)}}};