const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(75,innerWidth/innerHeight,0.1,1000);
camera.position.z=5;

const renderer=new THREE.WebGLRenderer({canvas:document.getElementById("webgl"),antialias:true});
renderer.setSize(innerWidth,innerHeight);

// particles
const geo=new THREE.BufferGeometry();
const pos=new Float32Array(300*3);
for(let i=0;i<300*3;i++){pos[i]=(Math.random()-0.5)*20;}
geo.setAttribute('position',new THREE.BufferAttribute(pos,3));
const mat=new THREE.PointsMaterial({size:0.05,color:0x38bdf8});
const particles=new THREE.Points(geo,mat);
scene.add(particles);

// light
const light=new THREE.PointLight(0xffffff,2);
light.position.set(5,5,5);
scene.add(light);

// load model
const loader=new THREE.GLTFLoader();
loader.load("assets/laptop.glb",(gltf)=>{
  let laptop=gltf.scene;
  laptop.scale.set(2,2,2);
  laptop.position.set(0,-2,0);
  scene.add(laptop);

  gsap.registerPlugin(ScrollTrigger);

  gsap.to(laptop.rotation,{
    y:Math.PI*2,
    scrollTrigger:{trigger:"#home",start:"top top",end:"bottom top",scrub:2}
  });
});

// animate
function animate(){
  requestAnimationFrame(animate);
  particles.rotation.y+=0.001;
  renderer.render(scene,camera);
}
animate();
