import {makeScene2D, Code, Line} from '@motion-canvas/2d';
import {DEFAULT, all, any, beginSlide, createRef, createSignal, waitFor, waitUntil} from '@motion-canvas/core';

import { DARK_GRAY } from '../utils/colors';
import { CppCode } from '../nodes/CppCode';

export default makeScene2D(function* (view) {
  const animalCode = createRef<Code>();
  const dogCode = createRef<Code>();
  const catCode = createRef<Code>();

  const leftLine = createRef<Line>();
  const rightLine = createRef<Line>();

  const lineX = 1080/3;
  const drawLines = createSignal(0);

  const animalInterface = Code.createSignal(`
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
      ref={animalCode}
      fontSize={42}
      />
  );

  view.add(
    <CppCode 
      ref={dogCode}
      fontSize={42}
      />
  );

  view.add(
    <CppCode 
      ref={catCode}
      fontSize={42}
      />
  );

  view.add(
    <Line
      ref={leftLine}
      points={[
        () => [-lineX, -(drawLines())],
        () => [-lineX, drawLines()]
      ]}
      stroke={'gray'}
      lineWidth={1.5}
    />
  );

  view.add(
    <Line
      ref={rightLine}
      points={[
        () => [lineX, -(drawLines())],
        () => [lineX, drawLines()]
      ]}
      stroke={'gray'}
      lineWidth={1.5}
    />
  );


  yield* beginSlide('Introduce animal');
  yield* animalCode().code.append(animalInterface, 0.6);

  yield* beginSlide('Introduce dog');
  yield* all(
    animalCode().fontSize(36, 0.6),
    animalCode().position([-400, 0], 0.6),

    dogCode().fontSize(36, 0),
    dogCode().position([400, 0], 0),
    dogCode().code.append(dogClass, 0.6)
  );

  yield* beginSlide('Introduce speak method')
  yield* all(
    animalInterface(`
class IAnimal {
  public:
    virtual void Speak() = 0;
  
  private:
    string name;
};`, 0.6),

    dogClass(`
class Dog : public IAnimal {
  public:
    Dog(string name) {
      this->name = name;
    }

    void Speak() override {
      std::cout << "Woof!" << endl;
    }
};`, 0.6)
  );

  yield* beginSlide('Virtual selection')
  yield* all(
    dogCode().selection([[0, 0], [0, 0]], 0.4),
    animalCode().selection(animalCode().findFirstRange('virtual'), 0.6),
  )

  yield* beginSlide('Override selection')
  yield* all(
    animalCode().selection([[0, 0], [0, 0]], 0.4),
    dogCode().selection(dogCode().findFirstRange('override'), 0.6),
  )

  yield* beginSlide('Woof selection')
  yield* dogCode().selection(dogCode().findFirstRange('"Woof!"'), 0.6); 

  yield* beginSlide('Introduce cat')
  yield* all(
    animalCode().fontSize(28, 0.6),
    animalCode().position([-650, 0], 0.6),
    animalCode().selection(DEFAULT, 0.6),

    dogCode().fontSize(28, 0.6),
    dogCode().position([0, 0], 0.6),
    dogCode().selection(DEFAULT, 0.6),

    catCode().fontSize(28, 0),
    catCode().position([650, 0], 0),
    catCode().code.append(`
class Cat : public IAnimal {
  public:
    Cat(string name) {
      this->name = name;
    }

    void Speak() override {
      std::cout << "Meow!" << endl;
    }
};`, 0.6)
  );
  yield* drawLines((720/2), 0.4);

  yield* beginSlide('Speaks selection')
  yield* all(
    animalCode().selection([[0, 0], [0, 0]], 0.4),

    dogCode().selection(dogCode().findFirstRange('"Woof!"'), 0.6),
    catCode().selection(catCode().findFirstRange('"Meow!"'), 0.6),
  )

  yield* beginSlide('end')
  yield* all(
    animalCode().selection(DEFAULT, 0.4),
    dogCode().selection(DEFAULT, 0.4),
    catCode().selection(DEFAULT, 0.4),
  )

  yield* all(
    drawLines(0, 0.4),

    animalCode().fontSize(0, 0.6),
    dogCode().fontSize(0, 0.6),
    catCode().fontSize(0, 0.6),
    )
});