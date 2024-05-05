import {makeScene2D, Code} from '@motion-canvas/2d';
import {DEFAULT, all, beginSlide, createRef, waitFor} from '@motion-canvas/core';

import { DARK_GRAY } from '../utils/colors';
import { CppCode } from '../nodes/CppCode';

export default makeScene2D(function* (view) {
  const code = createRef<Code>();

  const animalClass = Code.createSignal(`
class IAnimal {  
  private:
    string name;
};
    
`);
  
    const dogClass = Code.createSignal(`
class Dog : public IAnimal {
  public:
    Dog(string name) {
      this->name = name;
    }
};
    
`);

  view.fill(DARK_GRAY);
  view.add(
    <CppCode 
      ref={code}
      fontSize={32}
      offsetX={-1}
      x={-400}
      />
  );

  yield* beginSlide('Animal interface');
  yield* code().code.append(animalClass, 0.6);

  yield* beginSlide('Dog class')
  yield* code().code.append(dogClass, 0.6);

  yield* beginSlide('Speak virtual')
  yield* all(animalClass(`
class IAnimal {
  public:
    virtual void Speak() = 0;
  
  private:
    string name;
};
    
`, 0.6));

  yield* beginSlide('virtual selection')
  yield* code().selection(code().findFirstRange('virtual'), 0.6);

  yield* beginSlide('= 0 selection')
  yield* code().selection(code().findFirstRange('= 0'), 0.6);
  
  yield* beginSlide('Speak override')
  yield* code().selection(DEFAULT, 0.6);
  yield* all(dogClass(`
class Dog : public IAnimal {
  public:
    Dog(string name) {
      this->name = name;
      Speak();
    }

    void Speak() override {
      std::cout << "Woof!" << endl;
    }
};
      
`, 0.6));

  yield* beginSlide('Speak override selection')
  yield* code().selection(code().findFirstRange('override'), 0.6);

  yield* beginSlide('woof selection')
  yield* code().selection(code().findFirstRange('"Woof!"'), 0.6);

  yield* beginSlide('clear selection')
  yield* code().selection(DEFAULT, 0.6);

  yield* waitFor(1);
});