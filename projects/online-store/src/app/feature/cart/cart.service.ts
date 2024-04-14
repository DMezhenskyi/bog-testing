import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Item } from '../courses/courses.model';
import { CartItem } from './cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  #state = new BehaviorSubject<Map<number, CartItem<Item>>>(new Map());

  get #currentState() {
    return this.#state.getValue();
  }

  itemsCount$: Observable<number> = this.#state
    .asObservable()
    .pipe(
      map((items) =>
        Array.from(items.values()).reduce((acc, item) => acc + item.quantity, 0)
      )
    );

  items$: Observable<CartItem<Item>[]> = this.#state
    .asObservable()
    .pipe(map((itemsMap) => Array.from(itemsMap.values())));

  add(item: Item) {
    const addedItem = this.#state.getValue().get(item.id);
    if (!addedItem) {
      const createdItem = this.createCartItem(item);
      const newState = this.#state.getValue().set(item.id, createdItem);
      this.#state.next(new Map(newState));
    } else {
      this.increment(item);
    }
  }
  increment(item: Item) {
    const cartItem = this.#currentState.get(item.id);
    if (cartItem) {
      this.#currentState.set(item.id, {
        ...cartItem,
        quantity: cartItem?.quantity + 1,
      });
      this.#state.next(new Map(this.#currentState));
    }
  }
  remove(item: Item) {
    const cartItem = this.#currentState.get(item.id);
    if (cartItem) {
      this.#currentState.delete(item.id);
      this.#state.next(new Map(this.#currentState));
    }
  }
  decrement(item: Item) {
    const cartItem = this.#currentState.get(item.id);
    if (cartItem) {
      if (cartItem.quantity > 1) {
        this.#currentState.set(item.id, {
          ...cartItem,
          quantity: cartItem?.quantity - 1,
        });
        this.#state.next(new Map(this.#currentState));
      } else {
        this.remove(item);
      }
    }
  }

  private createCartItem(item: Item): CartItem<Item> {
    return {
      quantity: 1,
      item,
    };
  }
}
