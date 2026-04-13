const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(75,innerWidth/innerHeight,0.1,1000);
camera.position.z=6;
const renderer=new THREE.WebGLRenderer({canvas:document.getElementById("webgl"),alpha:true});
renderer.setSize(innerWidth,innerHeight);

const light=new THREE.PointLight(0xffffff,2);
light.position.set(5,5,5);
scene.add(light);

const geo=new THREE.BufferGeometry();
const count=400;
const pos=new Float32Array(count*3);
for(let i=0;i<count*3;i++){pos[i]=(Math.random()-0.5)*30;}
geo.setAttribute('position',new THREE.BufferAttribute(pos,3));
const mat=new THREE.PointsMaterial({size:0.05,color:0x38bdf8});
const particles=new THREE.Points(geo,mat);
scene.add(particles);

const loader=new THREE.GLTFLoader();
let laptop;

loader.load("assets/laptop.glb",(gltf)=>{
laptop=gltf.scene;
laptop.scale.set(2,2,2);
laptop.position.set(0,-2,0);
scene.add(laptop);

gsap.registerPlugin(ScrollTrigger);

let tl=gsap.timeline({
scrollTrigger:{trigger:"#home",start:"top top",end:"bottom top",scrub:2}
});
tl.to(laptop.position,{y:1}).to(laptop.position,{y:3});

gsap.to(laptop.scale,{
x:0,y:0,z:0,
scrollTrigger:{trigger:"#skills",start:"top center",end:"top top",scrub:true}
});
});

function animate(){
requestAnimationFrame(animate);
particles.rotation.y+=0.001;
renderer.render(scene,camera);
}
animate();
