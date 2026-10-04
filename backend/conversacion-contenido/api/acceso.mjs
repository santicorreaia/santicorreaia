import {timingSafeEqual} from 'node:crypto';
export default function handler(req,res){
res.setHeader('Cache-Control','no-store');res.setHeader('Referrer-Policy','no-referrer');
const code=process.env.DEMO_ACCESS_CODE;const expected=code?.split('-').slice(1,3).join('');const given=req.query.t;
if(req.method!=='GET'||!expected||typeof given!=='string'||Buffer.byteLength(given)!==Buffer.byteLength(expected)||!timingSafeEqual(Buffer.from(given),Buffer.from(expected)))return res.status(404).end('Enlace no disponible.');
res.setHeader('Location','https://santicorreaia.github.io/santicorreaia/apps/conversacion-contenido/#acceso='+encodeURIComponent(code));return res.status(302).end();
}
