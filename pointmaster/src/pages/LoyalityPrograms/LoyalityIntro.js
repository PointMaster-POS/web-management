// import React, { useContext } from 'react';
// import { Button, Drawer } from 'antd';
// import { DrawerContext,DrawerProvider } from '../../context/DrowerContext';
// import LoyalityCard from "../../components/LoyalityProgramsComponents/LoyalityCard";
// const LoyalityIntro = () => {

//     const [open, showDrawer, onClose] = useContext(DrawerContext);

//     //those states are provided by DrowerContext.js
// //   const [open, setOpen] = useState(false);
// //   const showDrawer = () => {
// //     setOpen(true);
// //   };
// //   const onClose = () => {
// //     setOpen(false);
// //   };
//   return (
//     <DrawerProvider>
//     <LoyalityCard />    
      
//       <Drawer title="Basic Drawer" onClose={onClose} open={open}>
//         <p>Some contents...</p>
//         <p>Some contents...</p>
//         <p>Some contents...</p>
//       </Drawer>
//     </DrawerProvider>
//   );
// };
// export default LoyalityIntro;