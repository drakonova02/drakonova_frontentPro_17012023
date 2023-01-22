'use strict'

class Recipe {
    constructor(name, listOfIngrid, descriptionCook, timeCook) {
      this.name = name;
      this.listOfIngrid = listOfIngrid;
      this.descriptionCook = descriptionCook;
      this.timeCook = timeCook;
    }

    isValid() {
        //перевірка на пусті елементи + в часі не може бути елементів менше 3

        if(typeof this.listOfIngrid !== 'object') {
            alert(`Incorrect type for list of ingridients - ${this.name}`);
            return false;
        }

        if(this.name === '' || this.listOfIngrid?.length < 1 || this.descriptionCook === '' || this.timeCook?.length < 3) {
                alert(`Recipe has empty value - recipe ${this.name}`);
                return false;
        }

        const timeCookLength = this.timeCook.lenght;
        const numberOfTime = parseFloat(this.timeCook);

        //перевірка що є хв
        if(!this.timeCook.includes('хв')) {
                alert(`Please input time of cook in minutes (with "хв") - ${this.name}`);
                return false;
        }

        // перевірка що перший елемент це число та що немаэ додаткових элементыв
        if(isNaN(numberOfTime) || numberOfTime.length + 2 === timeCookLength) {
            alert(`Invalid value of time of cook - ${this.name}`);
            return false;
        }


        //перевірка що час приготування більше одиниці (мінімальний час виконання) та менше доби в хвилинах
        if(numberOfTime < 1 || numberOfTime > 1440) {
            alert(`Invalid value of time of cook - ${this.name}`);
            return false;
        }

        return true;
    }
};

class BookOfRecipe {
    bookRecipe = [];

    addRecipe(recipe) {
        if(!recipe.isValid()) {
            return false;
        }

        alert(`We add ${recipe.name} to book`);
        this.bookRecipe.push(recipe);
    }

    findTimeCook(time) {
        const listRecipe = this.bookRecipe.reduce(function(result, element) {
            const timeCook = parseFloat(element.timeCook);
        
            if(timeCook <= time) {
                result.push(element);
            }
        
            return result;
        
        }, []);

        return listRecipe;
    }

    findIngrid(ingridients) {
        const listRecipe = this.bookRecipe.reduce(function(result, element) {

            for(const ingrid of ingridients) {
                if(!element.listOfIngrid.includes(ingrid)) {
                    return result;
                }
            }

            result.push(element);
        
            return result;
        
        }, [])

        return listRecipe;
    }
}


//Main programm

function generateMessage(message, list) {
    const arrayName = list.reduce(function(result, element) {
        result.push(element.name);

        return result;
    }, [])

    if(arrayName.length) {
        alert(`We filter recipes of ${message}, we have for you ${arrayName.lenght} recipes: ${arrayName.join(', ')}`);
    } else {
        alert(`We havent any result for ${message}`);
    }
}

const recipeFirst = new Recipe('Тірамісу', ['Печиво Савоярді'], 'Ключ к успеху в приготовлении Тирамису — качественные ингредиеты, поэтому для начала давайте разберёмся с ними. Я думаю, самый главный вопрос, который может возникнуть — чем заменить сыр Маскарпоне?', '30хв');
const recipeSecond = new Recipe('Грудинка у вершках', ['Вершки', 'Грудинка', 'Сіль'], 'Куриную грудку вымыть, просушить салфетками, отделить от кости и нарезать небольшими кусочками.', '60хв');
const recipeThird = new Recipe('Курячі ніжки', ['Курячі ніжки', 'майонез', 'картопля', 'морква'], 'Посыпать курицу солью, паприкой и черным молотым перцем, перемешать, оставить на 30 минут.', '120хв');
const recipeForth = new Recipe('Печево картопля', ['Пкчиво Марія', 'Згущене молоко'], 'Просейте вместе муку и крахмал. Взбейте яйца миксером, постепенно всыпая сахар. Масса должна стать белой и кремообразной, но не слишком густой. Частями введите в яичную смесь муку с крахмалом.', '60хв');
const recipeFifth = new Recipe('Запечена картопля', ['картопля', 'лук'], 'Наріжте лук і картоплю. запечіть', '30хв');
const recipeSixth = new Recipe('Запечена баранина', ['баранина', 'картопля', 'морква'], 'Мясо помойте и порежьте на куски примерно 2 × 2 см. Очистите и обжарьте в большом количестве масла зубчики чеснока. Когда чеснок отдаст аромат маслу, уберите его и подрумяньте баранину.', '60хв');
const recipeSeventh = new Recipe('Запечені гриби', ['баранина', 'картопля', 'морква'], 'Помойте и обсушите свинину. Сделайте поперечные разрезы, но не прорезайте мясо до конца. Должно получиться что-то вроде книжки со страницами толщиной около 1 см.' , '4562587522хв');

const bookOfRecipe = new BookOfRecipe();

bookOfRecipe.addRecipe(recipeFirst);
bookOfRecipe.addRecipe(recipeSecond);
bookOfRecipe.addRecipe(recipeThird);
bookOfRecipe.addRecipe(recipeForth);
bookOfRecipe.addRecipe(recipeFifth);
bookOfRecipe.addRecipe(recipeSixth);
bookOfRecipe.addRecipe(recipeSeventh);

const timeList = bookOfRecipe.findTimeCook(60);
generateMessage('time of 60', timeList);

const ingridList = bookOfRecipe.findIngrid(['картопля', 'морква']);
generateMessage('ingridients of картопля, морква', ingridList);