export class DeepAsync {

    public promise4: Promise<number>;

    public increment1(x: number): Promise<number> {
        return Promise.resolve(x + 1);
    }

    public async increment2(x: number): Promise<number> {
        return await this.increment1(await this.increment1(x));
    }

    public async increment4(x: number): Promise<number> {
        if (!this.promise4) {
            this.promise4 = this.increment2(await this.increment2(x));
        }
        return await this.promise4;
    }

    public async increment8(x: number): Promise<number> {
        return await this.increment4(await this.increment4(x));
    }

    public async increment16(x: number): Promise<number> {
        return await this.increment8(await this.increment8(x));
    }

    public async increment32(x: number): Promise<number> {
        return await this.increment16(await this.increment16(x));
    }
}

describe('Async overhead test', () => {

    it('Test async overhead', async function () {
        console.time('async');
        let da = new DeepAsync();
        let sum = 0;
        for (var i = 0; i < 10; i++) {
            sum += await da.increment8(i);
        }
        console.timeEnd('async');
        console.log('SUM', sum);
    });

});
