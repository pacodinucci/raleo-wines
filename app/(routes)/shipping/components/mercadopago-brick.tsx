import React, { useEffect } from "react";

const MercadoPagoBrandBrick: React.FC = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.async = true;
    script.onload = () => {
      if (window.MercadoPago) {
        const mp = new window.MercadoPago(
          "APP_USR-a078b335-6ac8-4b59-8cce-eb01891fea07",
          {
            locale: "es-AR",
          }
        );

        const bricksBuilder = mp.bricks();

        const renderBrandBrick = async (bricksBuilder: any) => {
          const settings = {
            customization: {
              texts: {
                valueProp: "security",
                align: "left",
                useCustomFont: false,
                size: "medium",
                fontWeight: "semibold",
                color: "secondary",
              },
              paymentMethods: {
                excludedPaymentMethods: [],
                excludedPaymentTypes: [],
                maxInstallments: 3,
                interestFreeInstallments: false,
              },
              visual: {
                backgroundColor: "white",
                hideMercadoPagoLogo: false,
                border: false,
                borderColor: "dark",
                contentAlign: "center",
                borderWidth: "1px",
                borderRadius: "13px",
                verticalPadding: "8px",
                horizontalPadding: "16px",
              },
            },
            callbacks: {
              onReady: () => {
                // Callback called when Brick is ready.
                // Here you can hide loadings from your site, for example.
              },
            },
          };
          window.brandBrickController = await bricksBuilder.create(
            "brand",
            "brandBrick_container",
            settings
          );
        };

        renderBrandBrick(bricksBuilder);
      }
    };

    document.body.appendChild(script);

    // Cleanup script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="brandBrick_container"></div>;
};

export default MercadoPagoBrandBrick;
