import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Collection, RepsonseData } from '@app/models';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class CollectionService {
  createCollection(collectionName: string, userId: string) {
    return this.http.post<RepsonseData<Collection>>(environment.service.collection, {
      name: collectionName,
      userId,
      posts: [],
    });
  }

  getCollections(userId: string) {
    return this.http.get<RepsonseData<Collection[]>>(environment.service.collection, {
      params: {
        userId,
      },
    });
  }

  updateCollection(collectionId: string, collection: Collection) {
    return this.http.put<RepsonseData<Collection>>(
      `${environment.service.collection}/${collectionId}`,
      collection,
    );
  }
  constructor(private readonly http: HttpClient) {}
}
