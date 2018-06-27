import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Bill } from '../../bill/bill.model';
import { CreateTagMutation } from '../tag.graphql';
import { Tag } from '../tag.model';
import { TagService } from '../tag.service';

@Component({
  selector: 'bf-tag-create',
  templateUrl: './tag-create.component.html'
})
export class TagCreateComponent implements OnInit {

  @Input() bill: Bill;
  @Output() create = new EventEmitter<any>();

  tag = new Tag();
  form: FormGroup;
  isSaving = false;

  constructor(
    private formBuilder: FormBuilder,
    private tagService: TagService
  ) {}

  /**
   * OnInit life-cycle method.
   */
  ngOnInit() {
    this.setForm();
  }

  /**
   * Sets the form.
   */
  setForm() {
    this.form = this.formBuilder.group({
      name: new FormControl(this.tag.name, [Validators.required]),
      color: new FormControl(this.tag.color)
    });
  }

  /**
   * Creates a tag.
   */
  save() {
    this.isSaving = true;

    const tag = Object.assign(this.tag, {
      name: this.form.get('name').value,
      color: this.form.get('color').value,
      bills: {
        connect: {
          id: this.bill.id,
          name: this.bill.name
        }
      }
    });
    const queryVariables = {
      where: { id: this.bill.id }
    };

    this.tagService.edit(tag, queryVariables, CreateTagMutation)
        .subscribe(() => {
          this.isSaving = false;
          this.cancel(true);
        }, (err) => {
          console.error(err);
          this.isSaving = false;
        });
  }

  /**
   * Cancels the create.
   * @param {boolean} [closePopover]
   */
  cancel(closePopover?: boolean) {
    this.form.reset(this.tag);
    if (closePopover) {
      this.create.emit();
    }
  }

}
