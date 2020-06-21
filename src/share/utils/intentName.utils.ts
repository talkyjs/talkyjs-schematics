/**
 * Remove intent name prefix like "AMAZON.HelpIntent"
 * @param intentName 
 * @example
 * stripAmazonPrefix("AMAZON.HelpIntent") => "HelpIntent"
 */
export const stripAmazonPrefix = (intentName: string): string => {
    return intentName.replace(/AMAZON\./, '')
}