import * as T from './three.module.js';
import { createWisps } from './wisps.js?v=ribbons-2';
export function nightGarden(scene,register,random){
 const wisps=createWisps(scene);
 const rnd=random, nodes=[], solarFlowers=[];
 const canvas=document.createElement('canvas');canvas.width=canvas.height=128;const c=canvas.getContext('2d'),g=c.createRadialGradient(64,64,0,64,64,64);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.12,'rgba(255,255,255,.55)');g.addColorStop(.4,'rgba(255,255,255,.13)');g.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=g;c.fillRect(0,0,128,128);const map=new T.CanvasTexture(canvas);
 const pool=Array.from({length:6},()=>{let light=new T.PointLight('#ffd092',0,26,1.4);scene.add(light);return light});

 function node(root,pos,color='#f4c27b',power=1){const material=new T.SpriteMaterial({map,color,transparent:true,depthWrite:false,blending:T.AdditiveBlending,toneMapped:false});const sprite=new T.Sprite(material);sprite.position.copy(pos);sprite.scale.setScalar(3.2);root.add(sprite);const n={root,sprite,power,charge:0,world:new T.Vector3(),color:new T.Color(color)};nodes.push(n);return n}
 function decorate(root,type){if(type==='pink'){node(root,new T.Vector3(0,2.4,0),'#ff27bb',2.4);node(root,new T.Vector3(2,.35,0),'#ff63d3',.8)}if(type==='lantern')node(root,new T.Vector3(0,3.3,0));if(type==='house')node(root,new T.Vector3(0,4,2.8),'#ffc47b',1.5);if(type==='garden'){for(let j=0;j<3;j++)node(root,new T.Vector3((rnd()-.5)*2,.7+rnd(),(rnd()-.5)*2),'#8cebd1',.3)}if(type==='ruin'){for(const x of [-5.7,5.7])node(root,new T.Vector3(x,4.5,0),'#93ddd0',.65)}}
 function tree(a,r){let root=new T.Group();root.position.set(Math.cos(a)*r,0,Math.sin(a)*r);scene.add(root);const proxy=new T.Mesh(new T.CylinderGeometry(1.6,2,13,6),new T.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}));proxy.position.y=6;root.add(proxy);for(let j=0;j<8;j++){const a=j*2.4;node(root,new T.Vector3(Math.cos(a)*1.6,3+j*.9,Math.sin(a)*1.6),'#a1e7b6',.12)}register(root,'tree');}
 function solar(a,r){const root=new T.Group();root.position.set(Math.cos(a)*r,0,Math.sin(a)*r);scene.add(root);const bronze=new T.MeshStandardMaterial({color:'#817e57',metalness:.7,roughness:.35}),panel=new T.MeshStandardMaterial({color:'#173d49',metalness:.7,roughness:.25,emissive:'#348b86',emissiveIntensity:.22});const stem=new T.Mesh(new T.CylinderGeometry(.13,.35,7,8),bronze);stem.position.y=3.5;root.add(stem);const head=new T.Group();head.position.y=7;root.add(head);for(let j=0;j<7;j++){let petal=new T.Mesh(new T.BoxGeometry(1.4,.12,3),panel);petal.position.set(Math.cos(j*6.28/7)*1.8,0,Math.sin(j*6.28/7)*1.8);petal.rotation.set(.22,-j*6.28/7+Math.PI/2,0);head.add(petal);const edge=new T.LineSegments(new T.EdgesGeometry(petal.geometry),new T.LineBasicMaterial({color:'#71b9ac',transparent:true,opacity:.7}));petal.add(edge)}node(root,new T.Vector3(0,6.6,0),'#a3ffe1',1.6);solarFlowers.push({root,head});register(root,'solar');}
 for(let i=0;i<18;i++)solar(i/18*Math.PI*2+.13,i%2?100:80);
 function activate(root,point){
 const origin=point?point.clone():root.position.clone().add(new T.Vector3(0,2.5,0));wisps.spawn(origin);
 for(const n of nodes){n.sprite.getWorldPosition(n.world);const distance=n.world.distanceTo(origin);if(n.root===root||distance<10)n.charge=.6*(1-Math.min(distance/20,.5))}root.userData.lit=!root.userData.lit;
 }
 function tick(dt,t,camera,bass){for(const n of nodes){n.charge=Math.max(0,n.charge-dt*.15);const active=n.root.userData.lit?.8:0;n.sprite.material.opacity=Math.min(1,.5+n.charge*.65+active*.35+bass*.35);n.sprite.scale.setScalar(3+n.power);n.sprite.getWorldPosition(n.world);n.distance=n.world.distanceToSquared(camera.position)}const nearest=[...nodes].sort((a,b)=>a.distance/(a.power+.2)-b.distance/(b.power+.2)).slice(0,6);nearest.forEach((n,i)=>{pool[i].position.copy(n.world);pool[i].color.copy(n.color);pool[i].intensity=(5+n.charge*32+(n.root.userData.lit?10:0)+bass*6)*n.power});wisps.tick(dt);
 for(const f of solarFlowers){f.head.rotation.y=0;f.head.rotation.z=.05}}
 return {decorate,tree,activate,tick};
}
