/*
 *
 * Selection sort
 * 
 * Copyright (c) 2015-2016  Monash University
 *
 * Written by Michael Wybrow
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
*/

function selectionSort(array)
{
    // Move through the list selecting the lowest value from
    // remaining elements.  Everything before index i will be
    // sorted.
    for (let i = 0; i < array.length - 1; ++i)
    {
        // min is the index of the lowest value we've seen in
        // remaining elements.
        let minIndex = i;
 
        // For each remaining element beyond i
        for (let j = i + 1; j < array.length; ++j)
        {
            // See if this value it lower than the value at
            // index min.
            if (array[j] < array[minIndex])
            {
                // If it is, make this the new min index.
                minIndex = j;
            }
        }
 
        // If the lowest value was not already at index i
        if (minIndex != i)
        {
            // Swap elements to put the lowest value at index i
            let temp = array[i];
            array[i] = array[minIndex];
            array[minIndex] = temp;
        }
 
        // Everything up to index i is now sorted, increment i.
    }
}

