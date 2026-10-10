import * as T from './three.module.js';
export function addGardenDetails(scene,register,night){
 const timber=new T.MeshStandardMaterial({color:'#65513b',roughness:.9});
 const brass=new T.MeshStandardMaterial({color:'#b09c67',metalness:.5,roughness:.45});
 const green=new T.MeshStandardMaterial({color:'#355d44',roughness:1});
 const glow=new T.MeshStandardMaterial({color:'#a2dccc',emissive:'#52bdac',emissiveIntensity:1.2});
 const warm=new T.MeshStandardMaterial({color:'#ffe1a2',emissive:'#edaa51',emissiveIntensity:1.8});
 function box(g,w,h,d,m,x,y,z){const o=new T.Mesh(new T.BoxGeometry(w,h,d),m);o.position.set(x,y,z);g.add(o);return o}
 for(let i=0;i<20;i++){
  const a=i*Math.PI*2/20+.1,r=101,g=new T.Group();g.position.set(Math.cos(a)*r,0,Math.sin(a)*r);g.rotation.y=-a-Math.PI/2;scene.add(g);
  // Raised planting terraces and a small timber shelter along the outer roadside.
  for(let level=0;level<3;level++){
   box(g,7-level*.65,.5,1.2,timber,0,.1+level*.5,-level*1.1);
   box(g,6.7-level*.65,.15,1,green,0,.4+level*.5,-level*1.1);
   for(let j=0;j<9;j++){const plant=new T.Mesh(new T.ConeGeometry(.25,.7,5),green);plant.position.set(-2.7+j*.65,.8+level*.5,-level*1.1);g.add(plant)}
  }
  for(const x of [-3.4,3.4])box(g,.18,5,.18,timber,x,2,-2.4);
  for(let k=0;k<8;k++)box(g,7.3,.12,.14,timber,0,4.5,-3.6+k*.32);
  // A woven-inspired diamond lattice, distinct from any specific sacred motif.
  for(let x=-2.7;x<3;x+=.6)for(let y=1.8;y<4.2;y+=.6){const d=new T.Mesh(new T.RingGeometry(.22,.25,4),brass);d.position.set(x,y,-2.55);d.rotation.z=Math.PI/4;g.add(d)}
  for(let j=0;j<5;j++){
   const x=(j-2)*1.3,y=3.3+(j%2)*.55;box(g,.035,4.5-y,.035,brass,x,(4.5+y)/2,-1.2);
   const lantern=new T.Mesh(new T.OctahedronGeometry(.28),warm);lantern.position.set(x,y,-1.2);g.add(lantern);
   const cage=new T.LineSegments(new T.EdgesGeometry(new T.OctahedronGeometry(.32)),new T.LineBasicMaterial({color:'#9e8353'}));cage.position.copy(lantern.position);g.add(cage);
  }
  register(g,'garden');night.decorate(g,'house');
  // Hanging vines and small luminous mushrooms at the path edge.
  for(let j=0;j<7;j++){
   const x=-3+j;for(let k=0;k<5+(j%3);k++){const vine=new T.Mesh(new T.SphereGeometry(.12,5,4),green);vine.scale.set(.8,1.8,.6);vine.position.set(x+Math.sin(k)*.12,4.3-k*.32,-1.7);g.add(vine)}
   const h=.2+(j%3)*.1;box(g,.06,h,.06,brass,x,h/2,1.8);
   const cap=new T.Mesh(new T.SphereGeometry(.22,8,5,0,Math.PI*2,0,Math.PI/2),glow);cap.position.set(x,h,1.8);g.add(cap);
  }
 }
}
