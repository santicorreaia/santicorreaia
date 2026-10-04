import {timingSafeEqual} from 'node:crypto';
import {generate} from '../engine.mjs';
export default async function handler(req,res){
 const origin='https://santicorreaia.github.io';
 res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Vary','Origin');
 if(req.headers.origin!==origin)return res.status(403).json({error:'Origen no permitido.'});
 res.setHeader('Access-Control-Allow-Origin',origin);res.setHeader('Access-Control-Allow-Headers','Content-Type, X-Demo-Access');res.setHeader('Access-Control-Allow-Methods','POST, OPTIONS');
 if(req.method==='OPTIONS')return res.status(204).end();
 if(req.method!=='POST')return res.status(405).json({error:'Método no permitido.'});
 const expected=process.env.DEMO_ACCESS_CODE;const actual=req.headers['x-demo-access'];
 if(!expected||typeof actual!=='string'||actual.length>200||Buffer.byteLength(actual)!==Buffer.byteLength(expected)||!timingSafeEqual(Buffer.from(actual),Buffer.from(expected)))return res.status(401).json({error:'Introduce el código privado de la demo para generar.'});
 if(JSON.stringify(req.body).length>90000)return res.status(413).json({error:'El texto supera el límite.'});
 try{return res.status(200).json(await generate(req.body,{...process.env,AI_PROVIDER:'gemini'}));}catch(e){return res.status(e.status||502).json({error:e.message});}
}
