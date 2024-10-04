import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], searchText?: string, filterCriteria?: string): any[] {
    if (!value) return [];

    // Si aucun critère n'est fourni, on retourne la valeur d'origine
    if (!searchText && !filterCriteria) return value;

    // Assurez-vous que searchText et filterCriteria sont soit undefined, soit des chaînes
    searchText = searchText ? searchText.toLowerCase() : undefined;
    filterCriteria = filterCriteria ? filterCriteria.toLowerCase() : undefined;

    // Filtrer les éléments selon le texte de recherche
    let filteredItems = value;
    if (searchText) {
      filteredItems = filteredItems.filter((item: any) =>
        JSON.stringify(item).toLowerCase().includes(searchText as string)
      );
    }

    // Appliquer le critère de filtrage en plus du texte de recherche
    if (filterCriteria) {
      filteredItems = filteredItems.filter((item: any) => 
        item.groupeSanguin?.toLowerCase() === filterCriteria ||
        item.nom?.toLowerCase() === filterCriteria
      );
    }

    return filteredItems;
  }
}
