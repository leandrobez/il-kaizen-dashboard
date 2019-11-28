<template>

    <div class="il-receipt">
        <div class="il-receipt--header">
            <div class="il-boxes">
                <div class="il-box">
                    <span>codigo barras</span>
                </div>
                <div class="il-box il-title">
                    <span>recibo</span>
                </div>
                <div class="il-box">
                    <span id="receiptNr">nº</span>
                </div>
                <div class="il-box">
                    <span id="receiptPay">R$ {{student.valor}}</span>
                </div>
            </div>
        </div>
        <div class="il-receipt--body">
            <div class="il-payed">
                <div class="il-payed--text">
                    <span>Recebi(emos) de</span>
                    <span id="receiptTitular">{{student.name}}</span>
                </div>
            </div>
            <div class="il-payed">
                <div class="il-payed--value">
                    <span>a quantida de </span>
                    <span id="receiptExtense">{{inFull()}}</span>
                </div>
            </div>
            <div class="il-payed">
                <div class="il-payed--service">
                    <span>Correspondente a </span>
                    <span id="receiptService">mensalidade referente ao mês de {{month}}</span>
                </div>
            </div>
            <div class="il-payed">
                <div class="il-payed--confirmation">
                    <span>e para clareza firmo(amos) o presente</span>
                    <span>recibo</span>
                </div>
            </div>
        </div>
        <div class="il-payed--asign">
            <div class="il-asign--date">
                <div class="il-date">
                    <span>Porto Alegre,</span>
                </div>
                <div class="il-date">
                    <span id="payedDay">{{getData()[2]}}</span>/
                </div>
                <div class="il-date">
                    <span id="payedMonth">{{getData()[1]}}</span>/
                </div>
                <div class="il-date">
                    <span id="payedYear">{{getData()[0]}}</span>
                </div>
            </div>
            <div class="il-asign">
                <span></span>
                <span></span>
            </div>
        </div>
    </div>

</template>

<script>
export default {
  name: 'receipt',
  props: {
    student: Object,
    data: String,
    month: String
  },
  methods: {
    inFull(custom_join_character) {
      const arrayWords = whoo => {
        let arrayValue, units, tens, scales;
        /* Array of units as words */
        units = [
          '',
          'um',
          'dois',
          'três',
          'quatro',
          'cinco',
          'seis',
          'ste',
          'oito',
          'nove',
          'dez',
          'onze',
          'doze',
          'treze',
          'quatorze',
          'quinze',
          'dezeseis',
          'dezesete',
          'dezoito',
          'dezenove'
        ];

        /* Array of tens as words */
        tens = [
          '',
          '',
          'vinte',
          'trinta',
          'quarenta',
          'cinquenta',
          'sessenta',
          'setenta',
          'oitenta',
          'noventa'
        ];

        /* Array of scales as words */
        scales = [
          '',
          'cem',
          'duzentos',
          'trezentos',
          'quatrocentos',
          'quinhentos',
          'seiscentos',
          'setecentos',
          'oitocentos',
          'novecentos',
          'mil'
        ];

        switch (whoo) {
          case 'units':
            arrayValue = units;
            break;
          case 'tens':
            arrayValue = tens;
            break;
          case 'scales':
            arrayValue = scales;
            break;
        }

        return arrayValue;
      };

      let string = this.student.valor.toString(),
        start,
        end,
        chunks,
        chunksLen,
        chunk,
        ints,
        i,
        word,
        words;

      var and = custom_join_character || 'e';

      /* Is number zero? */
      if (parseInt(string) === 0) {
        return 'zero';
      }

      /* Split user arguemnt into 3 digit chunks from right to left */
      start = string.length;
      chunks = [];
      while (start > 0) {
        end = start;
        chunks.push(string.slice((start = Math.max(0, start - 3)), end));
      }

      /* Check if function has enough scale words to be able to stringify the user argument */
      chunksLen = chunks.length;
      if (chunksLen > arrayWords('scales').length) {
        return '';
      }

      /* Stringify each integer in each chunk */
      words = [];
      for (i = 0; i < chunksLen; i++) {
        chunk = parseInt(chunks[i]);

        if (chunk) {
          /* Split chunk into array of individual integers */
          ints = chunks[i]
            .split('')
            .reverse()
            .map(parseFloat);

          /* If tens integer is 1, i.e. 10, then add 10 to units integer */
          if (ints[1] === 1) {
            ints[0] += 10;
          }

          /* Add unit word if array item exists */
          if ((word = arrayWords('units')[ints[0]])) {
            words.push(word);
          }

          /* Add tens word if array item exists */
          if ((word = arrayWords('tens')[ints[1]])) {
            if (word !== '') {
              words.push(word + ' ' + and);
            }
          }

          /* Add scale word if chunk is not zero and array item exists */
          if ((word = arrayWords('scales')[ints[2]])) {
            words.push(word + ' ' + and);
          }
        }
      }
      return words.reverse().join(' ') + ' reais';
    },
    getData() {
      let dt = this.data.split('-');
      return dt;
    }
  }
};
</script>

<style lang="scss" scoped>
.il-receipt {
  padding: 10px;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 3px 7px #1e637e;
  .il-receipt--header,
  .il-receipt--body,
  .il-receipt--assign {
    padding: 0.5rem 0;
  }
  .il-boxes {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    .il-box {
      margin: 0.2rem;
      border: 1px solid rgb(67, 125, 172);
      background: #4d9caa;
      padding: 0 0.15rem;
      &.il-title {
        background: #1e637e;
        color: white;
        font-weight: 800;
        text-align: center;
      }
    }
  }
  .il-receipt--body,
  .il-payed--asign {
    font-size: 0.85rem;
    color: #1e637e;
  }
  .il-payed .il-payed--text,
  .il-payed .il-payed--value,
  .il-payed .il-payed--service,
  .il-payed .il-payed--confirmation {
    margin-bottom: 0.5rem;
    span {
      display: inline-block;
      &:first-child {
        margin-right: 1rem;
      }
      &:nth-child(2) {
        position: relative;
        min-width: 400px;
        opacity: 0.5;
        &:after {
          content: '';
          position: absolute;
          left: 0;
          top: 100%;
          padding: 0;
          height: 1px;
          width: 100%;
          background: rgb(131, 117, 117);
          opacity: 0.9;
        }
      }
    }
  }
  .il-payed--asign {
    margin: 0.4rem 0;
    .il-asign--date {
      display: flex;
      justify-content: flex-start;
      span {
        margin: 0 0.35rem;
        font-weight: 700;
      }
    }
    .il-asign {
      margin-top: 1rem;
      height: 50px;
      span {
        display: block;
        width: 100%;
        text-align: right;
        &:first-child {
          position: relative;
          &:after {
            content: '';
            position: absolute;
            left: 50%;
            top: 100%;
            padding: 0;
            height: 1px;
            width: 50%;
            background: #43aaa0;
            opacity: 0.9;
          }
        }
        &:nth-child(2) {
          position: relative;
          &:after {
            content: 'assinatura';
            font-size: 0.85rem;
            color: black;
            position: absolute;
            left: 50%;
            top: 100%;
            padding: 0;
            text-align: center;
            width: 50%;
          }
        }
      }
    }
  }
}
</style>
