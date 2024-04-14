/**
 * Checks if value is number (can be converted to number)
 * 100 => true
 * '100' => true
 * '' => false
 * '100abc' => false
 * {} => false
 * ...
 */
export function isNumber(value: any) {
  return !isNaN(parseFloat(value)) && !isNaN(Number(value));
}
/**
 * Transforms a provided value to a boolean component property
 * 'false' => false | it allows <comp disable="false" />
 * '' => true | it allows <comp disable />
 * null => false
 * 
 */
export function toBooleanProperty(value: any): boolean {
  return value != null && `${value}` !== 'false';
}
/**
 * Transforms provided value to number component input
 *  100 => 100;
 * '100' => 100;
 * '' => 0
 * NaN => 0
 * ...
 * */
export function toNumberProperty(value: any): number {
  return isNumber(value) ? Number(value) : 0;
}

