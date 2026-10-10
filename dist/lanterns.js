import * as T from './three.module.js';
// Original botanical and geometric patterns, drawn for these lanterns.
export function createLanternFactory(){
 const frame=new T.MeshStandardMaterial({color:'#58472f',metalness:.65,roughness:.4});
 const palette=['#ffd28b','#ff35bf','#69dfce'];
 const textures=palette.map((color,index)=>{
 const c=document.createElement('canvas');c.width=c.height=1024;const x=c.getContext('2d');x.scale(4,4);x.fillStyle='#101d20';x.fillRect(0,0,256,256);x.strokeStyle=color;x.fillStyle=color;x.lineWidth=1;
 for(const inset of [4,9,16])x.strokeRect(inset,inset,256-inset*2,256-inset*2);
 for(let p=23;p<240;p+=9){for(const [a,b] of [[p,12],[p,244],[12,p],[244,p]]){x.beginPath();x.arc(a,b,1.3,0,Math.PI*2);x.fill()}}
 for(let row=0;row<2;row++)for(let col=0;col<2;col++){
 x.save();x.translate(69+col*118,69+row*118);
 for(let ring=0;ring<2;ring++){x.save();if(ring)x.rotate(Math.PI/8);for(let j=0;j<8;j++){x.rotate(Math.PI/4);x.beginPath();x.moveTo(0,7);x.bezierCurveTo(-15,19,-10,40,0,48-ring*13);x.bezierCurveTo(10,40,15,19,0,7);if(!ring)x.fill();else{x.strokeStyle='#fff0c3';x.stroke()}x.beginPath();x.moveTo(0,12);x.lineTo(0,40);x.strokeStyle='#263333';x.stroke()}x.restore()}
 x.strokeStyle=color;for(const r of [12,16,51]){x.beginPath();x.arc(0,0,r,0,Math.PI*2);x.stroke()}
 for(let j=0;j<24;j++){const a=j*Math.PI/12;x.beginPath();x.arc(Math.cos(a)*46,Math.sin(a)*46,1.15,0,Math.PI*2);x.fill()}
 x.fillStyle='#fff4c9';x.beginPath();x.arc(0,0,5,0,Math.PI*2);x.fill();x.restore();
 }
 const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;t.anisotropy=4;return t});
 function mesh(g,geometry,material,x,y,z){const m=new T.Mesh(geometry,material);m.position.set(x,y,z);g.add(m);return m}
 function bar(g,w,h,d,x,y,z){return mesh(g,new T.BoxGeometry(w,h,d),frame,x,y,z)}
 return function lantern(parent,index){const accent=palette[index%3],material=new T.MeshStandardMaterial({map:textures[index%3],emissiveMap:textures[index%3],emissive:accent,emissiveIntensity:1.8,roughness:.45,metalness:.15});const body=new T.Group();parent.add(body);
 const type=index%3;
 if(type===0){
  bar(parent,.2,1,.2,0,.5,0);body.position.y=2.65;
  for(let level=0;level<3;level++){let y=(level-1)*1.05;mesh(body,new T.BoxGeometry(1.05,.96,1.05),material,0,y,0);bar(body,1.2,.1,1.2,0,y+.51,0)}
  for(const x of [-.57,.57])for(const z of [-.57,.57])bar(body,.07,3.25,.07,x,0,z);
  mesh(body,new T.ConeGeometry(.9,.55,4),frame,0,1.9,0).rotation.y=Math.PI/4;
 }else if(type===1){
  bar(parent,.15,5.5,.15,0,2.75,0);bar(parent,3,.12,.15,0,5.4,0);body.position.y=3.4;
  for(let j=0;j<3;j++){const x=(j-1)*1.05,y=j%2?.5:0;bar(parent,.025,2-y,.025,x,4.4+y/2,0);const globe=mesh(body,new T.SphereGeometry(.46,16,12),material,x,y,0);globe.scale.y=1.3;for(const offset of [-.55,.55])mesh(body,new T.CylinderGeometry(.21,.21,.12,10),frame,x,y+offset,0);mesh(body,new T.ConeGeometry(.14,.3,6),frame,x,y-.8,0)}
 }else{
  bar(parent,.17,4.8,.17,0,2.4,0);body.position.y=3.4;
  mesh(body,new T.CylinderGeometry(.54,.54,2.3,16),material,0,0,0);
  for(const y of [-1.2,1.2])mesh(body,new T.CylinderGeometry(.65,.65,.12,16),frame,0,y,0);
  for(let k=0;k<8;k++){let a=k*Math.PI/4;bar(body,.045,2.4,.045,Math.cos(a)*.55,0,Math.sin(a)*.55)}
 }
 body.userData.fixtureMaterial=material;return body;
 };
}
