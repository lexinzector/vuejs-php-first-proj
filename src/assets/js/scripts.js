// склонение слов (метод 1)
export function decl1(intval, expr){
	if(intval == null || typeof(intval) == 'undefined') intval = 1;
	if(expr == null || typeof(expr) == 'undefined') expr = ['день', 'дня', 'дней'];
	
	intval = parseInt(intval);
	var count = intval % 100;
	var result = '';
	if(count >= 5 && count <= 20){
		result = expr[2];
	} else {
		count = count % 10;
		if(count == 1){
			result = expr[0];
		} else if(count >= 2 && count <= 4){
			result = expr[1];
		} else {
			result = expr[2];
		}
	}
	return result;
}
// склонение слов (метод 2)
export function decl2(intval, expr){
	if(intval == null || typeof(intval) == 'undefined') intval = 1;
	if(expr == null || typeof(expr) == 'undefined') expr = ['день', 'дня', 'дней'];
	
	var k = intval % 10 == 1 && intval % 100 != 11 ? 0 : (intval % 10 >= 2 && intval % 10 <= 4 && (intval % 100 < 10 || intval % 100 >= 20) ? 1 : 2);
	return expr[k];
}