import {
  reactExtension,
  useBuyerJourneyIntercept,
  useExtensionApi,
} from "@shopify/ui-extensions-react/checkout";

export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

function Extension() {
  const { buyerJourney } = useExtensionApi();

  // Intercept the checkout flow
  useBuyerJourneyIntercept((state) => {
    const shippingAddress = state?.shippingAddress;

    // Condition check and throw error if the entered address contains a PO Box
    if (
      shippingAddress?.address1 &&
      /P\.?O\.?\s*Box/i.test(shippingAddress.address1)
    ) {
      return {
        behavior: "block",
        reason: "Invalid Address",
        errors: [
          {
            target: "shippingAddress",
            message:
              "We cannot ship to PO boxes",
          },
        ],
      };
    }

    // Allow to proceed if no PO Box is detected
    return { behavior: "allow" };
  });

  return null;
}

