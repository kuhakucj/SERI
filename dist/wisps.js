import * as T from './three.module.js';
export function createWisps(scene){
 const active=[],steps=64;
 function release(effect){scene.remove(effect.group);effect.group.traverse(o=>{if(o.isMesh){o.geometry.dispose();o.material.dispose()}})}
 function spawn(origin){const group=new T.Group();group.position.copy(origin);group.rotation.y=Math.atan2(-origin.z,origin.x);scene.add(group);const ribbons=[];
 for(let k=0;k<5;k++){
 const geometry=new T.BufferGeometry(),positions=new Float32Array((steps+1)*6),uv=new Float32Array((steps+1)*4),indices=[];
 for(let j=0;j<=steps;j++){uv.set([j/steps,0,j/steps,1],j*4);if(j<steps){const a=j*2;indices.push(a,a+1,a+2,a+1,a+3,a+2)}}
 geometry.setAttribute('position',new T.BufferAttribute(positions,3));geometry.setAttribute('uv',new T.BufferAttribute(uv,2));geometry.setIndex(indices);
 const material=new T.ShaderMaterial({uniforms:{tint:{value:new T.Color(['#c9ff81','#80eebb','#e7ffc5','#cda6ff','#b9f676'][k])},fade:{value:0}},vertexShader:'varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',fragmentShader:'uniform vec3 tint; uniform float fade; varying vec2 vUv; void main(){float edge=pow(max(0.0,1.0-abs(vUv.y*2.0-1.0)),1.5);float tail=smoothstep(0.0,0.28,vUv.x);gl_FragColor=vec4(tint,edge*tail*fade*.6);}',transparent:true,depthWrite:false,side:T.DoubleSide,blending:T.AdditiveBlending});
 const mesh=new T.Mesh(geometry,material);mesh.frustumCulled=false;group.add(mesh);ribbons.push(mesh);
 }
 active.push({group,ribbons,age:0});if(active.length>6)release(active.shift());
 }
 function tick(dt){for(let n=active.length-1;n>=0;n--){const effect=active[n];effect.age+=dt;const t=effect.age,fade=Math.min(1,t/.18)*Math.max(0,1-Math.max(0,t-1.3)/1.5);effect.group.position.y+=dt*.35;
 effect.ribbons.forEach((mesh,k)=>{const p=mesh.geometry.attributes.position;for(let j=0;j<=steps;j++){const u=j/steps,travel=t*3.5,x=travel-(1-u)*5.5,phase=u*7-t*3+k*1.3,spread=Math.pow(1-u,.7),y=Math.sin(phase)*(.12+spread*.65)+k*.09,z=Math.cos(phase*.9)*spread*.55;const width=Math.sin(Math.PI*u)*(.22+k*.035)+Math.exp(-Math.pow((u-.88)*12,2))*.3;const twist=phase*.6;for(let side=0;side<2;side++){let sign=side?1:-1;p.setXYZ(j*2+side,x,y+Math.cos(twist)*width*sign,z+Math.sin(twist)*width*sign)}}p.needsUpdate=true;mesh.material.uniforms.fade.value=fade});
 if(t>2.8){release(effect);active.splice(n,1)}
 }}
 return {spawn,tick,get count(){return active.length}};
}
