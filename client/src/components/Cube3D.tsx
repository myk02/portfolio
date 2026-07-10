import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import { useTexture } from "@react-three/drei";
import { BoxGeometry, EdgesGeometry, LineBasicMaterial, LineSegments, Mesh, MeshBasicMaterial, DoubleSide, Group } from "three";

interface Cube3DProps {
  mouseX: number;
  mouseY: number;
}

export default function Cube3D({ mouseX, mouseY }: Cube3DProps) {
  const groupRef = useRef<Group>(null);
  const texture = useTexture("/mike.png");

  const edgesMaterial = useMemo(() => new LineBasicMaterial({ color: "#0a0a0a" }), []);

  const outerGeo = useMemo(() => new BoxGeometry(2.2, 2.2, 2.2), []);

  const edgesGeo = useMemo(() => {
    const geo = new BoxGeometry(2.2, 2.2, 2.2);
    return new EdgesGeometry(geo);
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const stiffness = 60;
    const damping = 20;
    const targetX = mouseY * Math.PI * 0.3;
    const targetY = mouseX * Math.PI * 0.3;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * (stiffness * delta) / (1 + damping * delta);
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * (stiffness * delta) / (1 + damping * delta);
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      <pointLight position={[0, 3, 3]} intensity={0.3} />
      <group ref={groupRef}>
        <mesh geometry={outerGeo}>
          <meshBasicMaterial map={texture} side={DoubleSide} />
        </mesh>
        <lineSegments geometry={edgesGeo} material={edgesMaterial} />
      </group>
    </>
  );
}
