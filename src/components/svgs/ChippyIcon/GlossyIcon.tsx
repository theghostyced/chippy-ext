// import React from "react";

// const GlossyIcon = () => {
//   return (
//     <svg
//       width="52"
//       height="52"
//       viewBox="0 0 39 52"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <title>Chippy Glossy Icon</title>
//       <path
//         d="M43.1038 21.233L41.6659 21.9034C40.9954 22.216 40.7064 23.0155 41.019 23.686C44.1384 30.3767 41.2546 38.3535 34.5639 41.473C27.8732 44.5924 19.9205 41.6974 16.8011 35.0067L15.7453 32.7423M22.8631 30.67L23.4775 31.9878C24.8991 35.0368 28.5743 36.3127 31.5972 34.8364C34.5523 33.3932 35.8514 29.8473 34.4933 26.8522L33.3638 24.3613M29.6494 16.1695L29.3579 15.5267C27.1895 10.7446 21.5347 8.65213 16.7757 10.8709L16.439 11.0279C11.5313 13.3161 9.4078 19.1494 11.6959 24.057L11.9262 24.5509"
//         stroke="#237BFF"
//         strokeWidth="3.42655"
//         strokeLinecap="round"
//       />
//       <path
//         d="M28.0697 21.9359C27.1606 19.9861 28.0072 17.655 29.9785 16.7359C31.9499 15.8168 34.2796 16.6669 35.1887 18.6167C36.0978 20.5666 35.2512 22.8976 33.2799 23.8167C31.3085 24.7358 28.9788 23.8857 28.0697 21.9359Z"
//         stroke="#237BFF"
//         strokeWidth="3.42655"
//       />
//       <path
//         d="M12.2919 32.2253C11.3828 30.2755 12.2294 27.9445 14.2007 27.0254C16.172 26.1063 18.5018 26.9564 19.4108 28.9062C20.3199 30.856 19.4734 33.187 17.502 34.1061C15.5307 35.0252 13.201 34.1751 12.2919 32.2253Z"
//         stroke="#237BFF"
//         strokeWidth="3.42655"
//       />
//       <path
//         d="M13.2691 19.5352C10.5313 20.2664 8.04436 21.1288 6.42945 23.5767"
//         stroke="#237BFF"
//         strokeWidth="3.42655"
//         strokeLinecap="round"
//       />
//       <path
//         d="M25.09 14.0236C27.4101 12.3966 29.6695 11.0461 32.5827 11.3829"
//         stroke="#237BFF"
//         strokeWidth="3.42655"
//         strokeLinecap="round"
//       />
//     </svg>
//   );
// };

// export default GlossyIcon;

import glossyIcon from 'data-base64:~assets/GlossyIcon.png';
import React from 'react';

const GlossyIcon = () => {
  return <img width={52} src={glossyIcon} alt='Glossy Chippy icon' />;
};

export default GlossyIcon;
