function isValidNumber(str: string) {
  if (str.length === 0) {
    return false;
  } else if (Number(str) === 0) {
    return true;
  } else {
    return Boolean(Number(str.trim()));
  }
}

const formatNumber = (str: string) => {
  return str
    .replace(/\s+/g, " ")
    .replace(/(\d{4})/g, "$1 ")
    .trim();
};

/**
 *
 * @param cardNumber number of the card in congested form
 * @returns card number in readable form
 */
export function formatCardNumber(cardNumber: string) {
  cardNumber = cardNumber.replaceAll(" ", "");
  if (isValidNumber(cardNumber)) {
    return formatNumber(cardNumber.substring(0, 16));
  }

  return "";
}

// export function formatExpiry(expiry: string) {
//   const expirySplitArray = expiry.split("/");
//   let month = expirySplitArray[0];
//   let year = expirySplitArray[1];
// }
