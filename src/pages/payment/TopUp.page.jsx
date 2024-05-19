import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { topup as topupApi } from '../../services/apiPayment';
import CenteredContainer from '../../components/ui/layout/Centered-container';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/Card';
import DynamicBreadcrumb from '../../components/ui/Dynamic-breadcrumb';
import { formatCurrency } from '../../utils/helpers';
import { toast } from 'sonner';
import Spinner from '../../components/ui/loading/Spinner';
import { useUser } from '../../hooks/auth/useUser';

const TopUp = () => {
  const { user } = useUser();
  const [amount, setAmount] = useState(0);

  const queryClient = useQueryClient();

  const currentBalance = user?.balance;
  const { mutate: topup, isPending } = useMutation({
    mutationFn: ({ balance }) => topupApi({ balance, currentBalance }),
    onSuccess: () => {
      const balance = user?.balance;
      toast(`Top up ${formatCurrency(amount)} Successfully.`, {
        description: `Your new balance is ${formatCurrency(balance)}.`,
      });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  const onClick = () => {
    if (amount === 0) {
      toast('Please select an amount to top up');
      return;
    }
    topup({ balance: amount });
  };

  const priceList = [
    { id: 1, price: 100000 },
    { id: 2, price: 200000 },
    { id: 3, price: 500000 },
    { id: 4, price: 1000000 },
    { id: 5, price: 10000000 },
    { id: 6, price: 50000000 },
    { id: 7, price: 100000000 },
    { id: 8, price: 150000000 },
  ];

  return (
    <CenteredContainer className="h-full items-center gap-4 pb-10">
      <div className="flex w-full max-w-[600px] flex-col gap-5">
        <DynamicBreadcrumb />
        <Card>
          <CardHeader>
            <CardTitle>Top Up</CardTitle>
            <CardDescription>
              Add money to your account to buy some products.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-5">
              {priceList?.map((price) => (
                <div
                  className={`relative rounded-md border border-input transition-all active:scale-90 ${amount === price.price ? 'bg-primary  text-primary-foreground' : 'bg-transparent hover:bg-accent'} cursor-pointer rounded-xl p-3 text-sm `}
                  key={price.id}
                >
                  <label>{formatCurrency(price.price)}</label>
                  <input
                    type="checkbox"
                    id={`category`}
                    className={`absolute left-0  h-full w-full cursor-pointer opacity-0`}
                    checked={amount === price.price}
                    value={price.price}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setAmount(price.price);
                      } else {
                        setAmount(0);
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button disabled={isPending} onClick={onClick}>
              Top Up {isPending && <Spinner className={'ml-1 h-5 w-5'} />}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </CenteredContainer>
  );
};

export default TopUp;
